import Document, { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '../blog.config'
import { CssBaseline } from '@zeit-ui/react'
import flush from 'styled-jsx/server'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
          {flush()}
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang={BLOG.language}>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(){
              if (!window.localStorage) return;
              if (window.localStorage.getItem('theme') === 'dark') {
                document.documentElement.style.background = '#000';
                document.body.style.background = '#000';
              };
            })()
          `,
            }}
          />
          <Main />
          <NextScript />
          
        </body>
      </Html>
    )
  }
}

export default MyDocument
