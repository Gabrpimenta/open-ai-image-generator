import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    'Search a Star Wars battle in Brazil'
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });
    setLoading(false);
    setImageUrl(res.data.data[0].url);
  };

  return (
    <div className='app-main'>
      {loading ? (
        <>
          <h2>Generating image...</h2>
        </>
      ) : (
        <>
          <h2>Generate an image using Open AI API</h2>
          <textarea
            className='app-input'
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows='10'
            cols='40'
          />
          <button onClick={generateImage}>Generate Image</button>
          {imageUrl.length > 0 ? (
            <img className='image-url' src={imageUrl} alt='Generated Image' />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
