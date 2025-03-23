document.addEventListener("DOMContentLoaded", function () {
    const getStartedBtn = document.getElementById("btnn");
    const bestPracticesSection = document.getElementById("best-practices-section");
    const bestPracticesTitle = document.querySelector(".header h1");
    const category = document.getElementById("cat");
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const summaryText = document.getElementById("summary-text");
    const progressBar = document.getElementById("progress-bar");
    const resetBtn = document.getElementById("reset-btn");
    const doneBtn = document.getElementById("done-btn");

    // Load stored selections from local storage
    checkboxes.forEach(checkbox => {
        const isChecked = localStorage.getItem(checkbox.id) === "true";
        checkbox.checked = isChecked;
        checkbox.addEventListener("change", updateSummary);
    });

    function updateSummary() {
        let checkedCount = document.querySelectorAll("input[type='checkbox']:checked").length;
        const totalCount = checkboxes.length;
        const percentage = Math.round((checkedCount / totalCount) * 100);

        summaryText.textContent = `You have selected ${checkedCount} best practices.`;
        progressBar.value = checkedCount;

        const rewardContainer = document.getElementById("reward-container");

        checkboxes.forEach(checkbox => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    function showReward() {
        const rewardContainer = document.getElementById("reward-container");
        const httpCodes = [200, 201, 202, 203, 204, 206, 207, 226];
        const randomCode = httpCodes[Math.floor(Math.random() * httpCodes.length)];
        const imgUrl = `https://http.dog/${randomCode}.jpg`;

        if (rewardContainer) {
            rewardContainer.innerHTML = `<img src="${imgUrl}" alt="HTTP Dog ${randomCode}" style="max-width: 300px; border-radius: 10px; margin-top: 20px;" />`;
        }
    }

    // Show best practices when clicking 'Get Started' & replace title in the same place
    getStartedBtn.addEventListener("click", function () {
        getStartedBtn.style.display = 'none';
        bestPracticesTitle.style.display = "none";
        bestPracticesSection.classList.remove("hidden");
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                localStorage.removeItem(checkbox.id);
            });
            updateSummary();
        });
    }

    if (doneBtn) {
        doneBtn.addEventListener("click", function () {
            const checkedCount = document.querySelectorAll("input[type='checkbox']:checked").length;
            const rewardContainer = document.getElementById("reward-container");

            if (checkedCount >= 12) {
                showReward();
            } else {
                if (rewardContainer) {
                    rewardContainer.innerHTML = `
                        <p style="color:red; font-weight: bold; font-size: 18px;">
                            You missed out! Please select at least 12 best practices to unlock your reward 🐶
                        </p>`;
                }
            }
        });
    }

    updateSummary();
});

let navbar = document.querySelector('nav');
window.addEventListener("scroll", function () {
    navbar.style.background = window.scrollY > 0 ? '#eefff9' : 'transparent';
});

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".mob-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
// Fucntion to fetch References
document.addEventListener("DOMContentLoaded", function () {
    const referencesList = document.getElementById("references-list");
    const loadingText = document.getElementById("loading-text");

    fetch("references.json")
        .then(response => response.json())
        .then(data => {
            loadingText.style.display = "none"; // Hide loading text once fetched

            data.forEach(ref => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>${ref.title}</strong> - 
                    <span>${ref.citation}</span>
                `;
                listItem.style.opacity = "1";
                listItem.style.transform = "translateY(0)";
                referencesList.appendChild(listItem);
            });
        })
        .catch(error => {
            loadingText.textContent = "Failed to load references.";
            console.error("Error fetching references:", error);
        });
});