try {
  (function () {
    let wiki = window.localStorage.getItem("lohi_wiki");

    const link = function (name) {
      return `<a href="javascript:(()=>{lohi.openpage('${name}')})()">${name}</a>`;
    };

    const sync = function () {
      window.localStorage.setItem("lohi_wiki", JSON.stringify(wiki));
      const toc = window.document.getElementById("toc");
      toc.innerHTML = `<br><strong>${wiki.name} wiki</strong><br>
      <ul>
        ${Object.keys(wiki.pages)
          .map((name) => `<li>${link(name)}</li>`)
          .join("")}
        <li><button onclick="lohi.openpage(prompt('Page name?'))">
          <image src="ad.svg" width="10" height="10"></image> add new page
        </button></li>
      </ul>`;
      toc.hidden = false;
    };

    if (wiki) {
      wiki = JSON.parse(wiki);
      sync();
    }

    const cleanse = function (str) {
      return str.replace(/['"\\]/g, "");
    };

    const page = function (name) {
      name = cleanse(name);
      const html =
        name === "toc"
          ? toc()
          : `<html><head>
  <title>${name}</title>
  <link rel="stylesheet" href="/css/khak.css" type="text/css" id="theme"></link>
  <link rel="icon" href='/media/NPHotChoc.svg.png'></link>
</head>
<body >
  <image src="logo.svg" width="30" height="30"></image> 
  <div class="gray notes">
    <sup>${link("toc")}</sup>${name}&nbsp;
  <!-- <button height="35"> -->
  <image src="/media/moon.svg" id="themech"
    width="30" height="30" >
  </image> <!-- </button> -->
  <script type="text/javascript" src="/js/theme.js">
  </script>
  <br>
  </div>
  <div class="fg"><!-- start body -->
    <div id="page">
      ${
        wiki.pages[name] ||
        "Nothing here!\nPress edit and click here to add stuff."
      }
    </div>
  </div><!-- end body -->
  <button onclick="page.contentEditable = true">edit</button>
  <button onclick="page.contentEditable = false;
                   lohi.wiki.pages[lohi.name] = page.innerHTML;
                   lohi.sync();">save edits</button>
  <script>
    var page = document.getElementById('page');
  </script>
</body></html>
`;
      const win = window.open("blank.html");
      if (win === null) alert("could not open your wiki");
      win.document.write(html);
      win.lohi = { openpage: page, name: name, wiki: wiki, sync: sync };
    };

    const toc = function () {
      return `<html><head>
  <title>${wiki.name} TOC</title>
  <link rel="stylesheet" href="/css/khak.css" type="text/css" id="theme"></link>
  <link rel="icon" href='/media/NPHotChoc.svg.png'></link>
</head>
<body >
  <image src="logo.svg" width="30" height="30"></image> 
  <div class="gray notes">
    ${wiki.name} Table of Contents&nbsp;
  <!-- <button height="35"> -->
  <image src="/media/moon.svg" id="themech"
    width="30" height="30" >
  </image> <!-- </button> -->
  <script type="text/javascript" src="/js/theme.js">
  </script>
  <br>
  </div>
  <div class="fg"><!-- start body -->
    <ul>
      ${Object.keys(wiki.pages).map((name) => `<li>${link(name)}</li>`)}
      <li>${link("toc")} (this page, click to update)</li>
    </ul><br>
    <button onclick="lohi.openpage(prompt('Page name?'))">
      <image src="ad.svg" width="10" height="10"></image> add new page
    </button>
  </div><!-- end body -->\
</body></html>
`;
    };

    const newbtn = document.getElementById("new");
    newbtn.onclick = function () {
      if (
        wiki &&
        !window.confirm("Are you sure? This will override your old wiki.")
      )
        return;
      wiki = {
        pages: {},
        name: cleanse(prompt("What will you call your wiki?"))
      };
      sync();
      page("toc");
    };

    const dlwbtn = document.getElementById("dlw");
    dlwbtn.onclick = function () {
      var a = document.createElement("a");
      a.href =
        "data:application/x-download;charset=utf-8," +
        encodeURIComponent(JSON.stringify(wiki));
      a.download = wiki.name + ".json";
      document.body.appendChild(a);
      a.click();
    };
    window.lohi = { openpage: page, wiki: wiki, sync: sync };
  })();
} catch (e) {
  console.log(e);
  throw e;
}
