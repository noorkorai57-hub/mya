const genBtn = document.getElementById('generateBtn');
const promptEl = document.getElementById('prompt');
const qualityEl = document.getElementById('quality');
const loader = document.getElementById('loader');
const result = document.getElementById('result');

async function showError(msg) {
  result.innerHTML = `<p style="color:#ff8a80">${msg}</p>`;
}

genBtn.addEventListener('click', async () => {
  const prompt = promptEl.value.trim();
  const quality = qualityEl.value;
  if (!prompt) return showError('Please enter a prompt.');

  // Clear previous result and show loader
  result.innerHTML = '';
  loader.style.display = 'block';

  try {
    // Fetch video URL from API
    const api = `https://yabes-api.pages.dev/api/ai/video/v2?prompt=${encodeURIComponent(prompt)}&quality=${encodeURIComponent(quality)}`;
    const res = await fetch(api);
    if (!res.ok) throw new Error('Network error');

    const data = await res.json();
    if (!data.url) throw new Error('No video URL returned');

    // Hide loader
    loader.style.display = 'none';

    // Show video in result
    result.innerHTML = `
      <div class="video-box">
        <video id="aiVideo" controls autoplay playsinline src="${data.url}"></video>
      </div>
    `;

  } catch (e) {
    console.error(e);
    loader.style.display = 'none';
    showError('⚠️ Failed to load video. Try again later.');
  }
});
    loader.style.display = 'none';
    result.innerHTML = `
      <div class="video-box">
        <div class="inner-loader" id="innerLoader">
          <div class="inner-spinner"></div>
          <p>Loading video...</p>
        </div>
        <video id="aiVideo" controls playsinline src="${videoURL}"></video>
      </div>
    `;

    const vid = document.getElementById('aiVideo');
    const innerLoader = document.getElementById('innerLoader');
    vid.addEventListener('canplay', () => {
      innerLoader.style.display = 'none';
    });

  } catch (e) {
    console.error(e);
    loader.style.display = 'none';
    showError('⚠️ Failed to load video. Try again later.');
  }
});
