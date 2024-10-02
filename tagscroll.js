document.addEventListener('DOMContentLoaded', () => {
    fetchHomePageData();
});

function fetchHomePageData() {
    const apiURL = 'https://api.jojoteashoppe.com/api/pages/APP_HOME';

    fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer marsyoungtest'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.data && data.data.pageSectionDtoList) {
                // Filter out the "Most Popular" section and generate views for all other sections
                const sections = data.data.pageSectionDtoList.filter(sec => sec.title !== 'Most Popular');
                generateAllTagSections(sections);
            } else {
                console.error('Unexpected API response:', data);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function generateAllTagSections(sections) {
    const tagsContainer = document.getElementById('tagsContainer');
    tagsContainer.innerHTML = ''; // Clear existing content

    sections.forEach(section => {
        // Create a container for each section
        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'section-container';

        // Create a section title
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.title;

        // Create a container for the tags within this section
        const tagList = document.createElement('div');
        tagList.className = 'tag-list'; // Horizontal scroll container

        // Generate tags for the section
        section.content.forEach(item => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag-item';
            tagElement.setAttribute('data-shadow', ''); // For random shadow color
            tagElement.style.setProperty('--shadow-color', getRandomColor()); // Apply random color

            // Image
            const image = document.createElement('img');
            image.src = item.images[0] || '';
            image.onerror = () => {
                image.replaceWith(createPlaceholder()); // Show placeholder on error
            };

            // Name
            const name = document.createElement('div');
            name.className = 'tag-name';
            name.textContent = item.name;

            // Description
            const description = document.createElement('div');
            description.className = 'tag-description';
            description.textContent = item.description;

            // Append elements
            tagElement.appendChild(image);
            tagElement.appendChild(name);
            tagElement.appendChild(description);
            tagElement.onclick = () => handleTagClick(item.id,item.images[0]);
            tagList.appendChild(tagElement);
        });

        // Append section title and tag list to the section container
        sectionContainer.appendChild(sectionTitle);
        sectionContainer.appendChild(tagList);

        // Append section container to the main container
        tagsContainer.appendChild(sectionContainer);
    });
}

function handleTagClick(productId,productImage) {
    window.parent.dispatchEvent(new CustomEvent('alertProductDetail', { detail: { productId: productId ,productImage: productImage} }));
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
}

function createPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.textContent = 'No Image';
    return placeholder;
}

