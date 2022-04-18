module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],

  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties'
  ],

  env: {
    development: {
      plugins: ['react-refresh/babel']
    },
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements'
      ]
    }
  }
}
