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
      plugins: [
        'react-hot-loader/babel'
      ]
    },
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements'
      ]
    }
  }
}
