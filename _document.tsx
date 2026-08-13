import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Other head content */}
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Tidio Chat Widget - Add before closing body tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tidiyo_API = Tidiyo_API || {}, Tidiyo_LoadStart = new Date();
              (function(){
                var s1 = document.createElement("script");
                s1.async = true;
                s1.src = "//code.tidio.co/xxuocgfjx71jafkryrar4fgky3sukgbz.js";
                s1.charset = "UTF-8";
                s1.setAttribute("crossorigin", "*");
                document.body.appendChild(s1);
              })();
            `
          }}
        />
      </body>
    </Html>
  )
}
