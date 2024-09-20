/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
          test: /\.(afm|ttf|otf|woff|woff2|eot)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts',
                publicPath: '/_next/static/fonts',
                esModule: false,
              },
            },
          ],
        });
    
        // Ensure the publicPath is correctly set to handle static files
        config.output.publicPath = `${config.output.publicPath}`;
    
        return config;
      },
  };;

export default nextConfig;
