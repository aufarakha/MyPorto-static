  // Function to render the Features section
  // Function to render the Features section with dynamic scaling
function renderFeatures(features, scale = 1) {
    const featuresContainer = document.getElementById("features-container");
    featuresContainer.innerHTML = ""; // Clear container before rendering
  
    features.forEach((feature, index) => {
      // Scale styles dynamically using the scaling factor
      const scaledStyles = `
        width: ${200 * scale}px; /* Base card width */
        padding: ${16 * scale}px; /* Base padding */
        font-size: ${14 * scale}px; /* Base font size */
      `;
      const scaledImageStyles = `
        height: ${100 * scale}px; /* Base image height */
      `;
      const scaledTitleStyles = `
        font-size: ${16 * scale}px; /* Base title font size */
        margin-bottom: ${8 * scale}px; /* Adjust spacing */
      `;
      const scaledDescStyles = `
        font-size: ${11 * scale}px; /* Base description font size */
        margin-bottom: ${12 * scale}px; /* Adjust spacing */
      `;
      const scaledButtonStyles = `
        padding: ${6 * scale}px ${16 * scale}px; /* Button padding */
        font-size: ${10 * scale}px; /* Button font size */
      `;
  
      const buttonsHtml = feature.buttons.map(button => {
        const buttonClass = button.type === "primary"
          ? `bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition`
          : `bg-gray-100 text-gray-800 rounded-full`;
        return `<button class="${buttonClass}" style="${scaledButtonStyles}">${button.text}</button>`;
      }).join("");

      // Calculate staggered delay (300ms increments)
      const animationDelay = index * 300; // 0ms, 300ms, 600ms, etc.
  
      featuresContainer.innerHTML += `
      <div class="delay-[${animationDelay}ms] duration-[600ms] 
                       taos:translate-x-[100%] taos:opacity-0" 
                 data-taos-offset="100">
        <div style="${scaledStyles}" class="bg-[rgb(247, 249, 253)] rounded-lg shadow-md flex flex-col items-center">
          <img src="${feature.image}" alt="${feature.title}" style="${scaledImageStyles}" class="w-full rounded-lg mb-3">
          <h3 style="${scaledTitleStyles}" class="font-semibold text-gray-700 text-center">${feature.title}</h3>
          <p style="${scaledDescStyles}" class="text-gray-600 text-center">${feature.description}</p>
          <div class="flex space-x-2 justify-center"
          
          onclick="window.open('${feature.learnMoreLink}', '_blank')">${buttonsHtml}</div>
        </div>
      </div>`;
    });
    
  }

  // Function to render the Blogs section
  function renderCerts(certs) {
    const certsContainer = document.getElementById("certs-container");
    certs.forEach(cert => {
      certsContainer.innerHTML += `
        <div class="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-start sm:gap-8 mb-8">
          <!-- Image Section -->
          <div class="sm:w-1/3">
            <img src="${cert.image}" alt="${cert.title}" class="rounded-lg shadow-lg">
          </div>
          <!-- Content Section -->
          <div class="sm:w-2/3 sm:pl-4 mt-6 sm:mt-0">
            <p class="text-sm text-gray-500 mb-2">${cert.date}</p>
            <h3 class="text-xl font-bold text-gray-800 mb-3 max-w-md">${cert.title}</h3>
            <p class="text-gray-600 mb-4 max-w-md">${cert.description}</p>
            <a href="${cert.readMoreLink}" target="_blank" class="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-600 transition">
              Lihat selengkapnya
              <i class="fas fa-external-link-alt ml-2"></i>
            </a>
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
      renderFeatures(data.features,1.4);
      renderCerts(data.certs);
      fetchCommitsCount();
      fetchAccountAge();
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });

    window.dispatchEvent(new Event('resize'));