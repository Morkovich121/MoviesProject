const apiConfig ={
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '697368aa5e29742591f2bd656f963847',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;