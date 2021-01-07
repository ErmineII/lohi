(function () {
  let wiki = window.localStorage.getItem("lohi_wiki");

  const link = function (name) {
    return `<a href="javscript:(()=>{lohi.openpage('${name}')})()">${name}</a>`;
  };

  const page = function (name) {
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
      ${wiki.pages[name] || "nothing here!"}
    </div>
  </div><!-- end body -->
  <button onclick="page.contentEditable = true">edit</button>
  <button onclick="page.contentEditable = false; lohi.wiki.pages[lohi.name] = page.innerHTML">save edits</button>
  <script>
    var page = document.body.getElementById('page');
  </script>
</body></html>
`;
    const win = window.open("blank.html");
    win.innerHTML = html;
    win.lohi = { openpage: page, name: name, wiki: wiki };
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
    </ul><br>
    <button onclick="lohi.openpage(prompt('Page name?'))">
      <image src="ad.svg" width="10" height="10"></image> add new page
    </button>
  </div><!-- end body -->
  <script></script>
</body></html>
`;
  };

  const newbtn = document.body.getElementById("new");
  newbtn.onclick = function () {
    if (
      wiki &&
      !window.confirm("Are you sure? This will override your old wiki.")
    )
      return;
    wiki = { pages: {} };
    page("toc");
  };
})();
