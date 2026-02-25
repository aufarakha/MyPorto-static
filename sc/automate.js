  // Function to render the Features section with minimal design
function renderFeatures(features) {
    const featuresContainer = document.getElementById("features-container");
    featuresContainer.innerHTML = "";
  
    features.forEach((feature, index) => {
      const animationDelay = index * 150;
  
      featuresContainer.innerHTML += `
      <div class="delay-[${animationDelay}ms] duration-[600ms] taos:translate-y-[50px] taos:opacity-0" 
           data-taos-offset="100">
        <div class="feature-card">
          <div class="feature-image-wrapper">
            <img src="${feature.image}" alt="${feature.title}" class="feature-image">
          </div>
          <div class="feature-content">
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
            <a href="${feature.learnMoreLink}" target="_blank" class="feature-button">
              View Project
            </a>
          </div>
        </div>
      </div>`;
    });
  }

  // Function to render the Certificates section with minimal design
  function renderCerts(certs) {
    const certsContainer = document.getElementById("certs-container");
    certsContainer.innerHTML = "";
    
    certs.forEach((cert, index) => {
      const animationDelay = index * 150;
      
      certsContainer.innerHTML += `
      <div class="delay-[${animationDelay}ms] duration-[600ms] taos:translate-y-[50px] taos:opacity-0" 
           data-taos-offset="100">
        <div class="cert-card">
          <div class="cert-image-wrapper">
            <img src="${cert.image}" alt="${cert.title}" class="cert-image">
          </div>
          <div class="cert-content">
            <span class="cert-date">${cert.date}</span>
            <h3 class="cert-title">${cert.title}</h3>
            <p class="cert-description">${cert.description}</p>
            <a href="${cert.readMoreLink}" target="_blank" class="cert-button">
              View Certificate
            </a>
          </div>
        </div>
      </div>`;
    });
  }

  // Fetch GitHub commits count
const fetchCommitsCount = async () => {
  const headers = { Accept: "application/vnd.github.cloak-preview+json" };
  try {
      const response = await fetch("https://api.github.com/search/commits?q=author:aufarakha", { headers });
      if (!response.ok) throw new Error("bad network response");
      const data = await response.json();
      document.getElementById("commit-count").innerText = data.total_count;
  } catch (error) {
      console.error("failed to fetch github commits count:", error);
      document.getElementById("commit-count").innerText = "Error";
  }
};

// Fetch GitHub account age
const fetchAccountAge = async () => {
  try {
      const response = await fetch("https://api.github.com/users/aufarakha");
      if (!response.ok) throw new Error("bad network response");
      const data = await response.json();
      const accountCreationDate = new Date(data.created_at);
      const currentYear = new Date().getFullYear();
      const experienceYears = currentYear - accountCreationDate.getFullYear();
      document.getElementById("experenceYear").innerText = experienceYears + "+";
  } catch (error) {
      console.error("failed to fetch github account age:", error);
      document.getElementById("experenceYear").innerText = "Error";
  }
}

  // Fetch the JSON file and render the sections
  fetch("data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then(data => {
      renderFeatures(data.features);
      renderCerts(data.certs);
      fetchCommitsCount();
      fetchAccountAge();
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });


    window.dispatchEvent(new Event('resize'));
