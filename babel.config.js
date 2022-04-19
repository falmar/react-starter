module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: process.env.APP_SSR === '1' ? { node: 'current' } : {}
      }
    ], [
      '@babel/preset-react'
    ]
  ],

  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties'
  ],

  env: {
    development: {
      plugins: process.env.APP_SSR === '1' ? [] : ['react-refresh/babel']
    },
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements'
      ]
    }
  }
}
