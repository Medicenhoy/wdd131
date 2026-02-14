const healthTips = [
    {
        id: 1,
        title: "Stay Hydrated",
        category: "nutrition",
        description: "Drinking water before meals can help you feel fuller.",
        image: "images/food.webp"
    },
    {
        id: 2,
        title: "Morning Stretch",
        category: "exercise",
        description: "Start your day with 5 minutes of stretching to improve blood flow.",
        image: "images/run.webp"
    },
    {
        id: 3,
        title: "Mindful Breathing",
        category: "mind",
        description: "Take deep breaths for 2 minutes to reduce cortisol levels.",
        image: "images/mind.webp"
    },
    {
        id: 4,
        title: "Eat More Fiber",
        category: "nutrition",
        description: "Fiber helps maintain bowel health and lowers cholesterol.",
        image: "images/food.webp"
    },
    {
        id: 5,
        title: "Walk Daily",
        category: "exercise",
        description: "A 30-minute walk can significantly improve heart health.",
        image: "images/run.webp"
    },
    {
        id: 6,
        title: "Digital Detox",
        category: "mind",
        description: "Disconnect from screens 1 hour before bed for better sleep.",
        image: "images/mind.webp"
    }
];


document.addEventListener("DOMContentLoaded", () => {
    
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            hamburger.textContent = navMenu.classList.contains("open") ? "X" : "☰";
        });
    }

    const yearSpan = document.getElementById("year");
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const path = window.location.pathname;

  
    if (path.includes("directory.html")) {
        displayTips(healthTips);
        setupFilters();
    } else if (path.includes("join.html")) {

        if (localStorage.getItem("medoraUser")) {
            showAlreadySubscribedMessage();
        } else {
            setupForm();
        }
    } else if (path.includes("thankyou.html")) {
        displayWelcomeMessage();
    } else {
        loadFeaturedTip();
        personalizeHome();
    }
});



function displayTips(tipsToDisplay) {
    const container = document.getElementById("directory-grid");
    if (!container) return;

    container.innerHTML = ""; 

    tipsToDisplay.forEach(tip => {
     
        const cardHTML = `
            <div class="card">
                <h3>${tip.title}</h3>
                <img src="${tip.image}" alt="${tip.title}" loading="lazy" width="300" height="200">
                <p>${tip.description}</p>
                <span style="background:${getCategoryColor(tip.category)}; padding:5px; color:white; border-radius:3px; font-size:0.8rem;">
                    ${tip.category.toUpperCase()}
                </span>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

function getCategoryColor(category) {
    if (category === "nutrition") return "#0077B6";
    if (category === "exercise") return "#D00000";
    return "#2A9D8F";
}

function setupFilters() {
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const filter = e.target.id.replace("filter-", "");
            if (filter === "all") {
                displayTips(healthTips);
            } else {

                const filtered = healthTips.filter(tip => tip.category === filter);
                displayTips(filtered);
            }
        });
    });
}

function loadFeaturedTip() {
    const container = document.getElementById("featured-tip");
    if (!container) return;

    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    
    container.innerHTML = `
        <div class="card" style="border: 2px solid #0077B6;">
            <h3>${randomTip.title}</h3>
            <p>${randomTip.description}</p>
        </div>
    `;
}

function setupForm() {
    const form = document.getElementById("join-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        const firstName = document.getElementById("fname").value;
        if(firstName) {
            localStorage.setItem("medoraUser", firstName);
        }
    });
}

function displayWelcomeMessage() {
    const messageElement = document.getElementById("welcome-message");
    const user = localStorage.getItem("medoraUser");

    if (messageElement && user) {
        messageElement.textContent = `Thank you, ${user}! You have successfully joined Medora.`;
        messageElement.style.color = "green";
        messageElement.style.fontWeight = "bold";
    }
}

function personalizeHome() {
    const user = localStorage.getItem("medoraUser");
    if (user) {
        const heroTitle = document.querySelector(".hero-text h1");
        if (heroTitle) {
            heroTitle.textContent = `Welcome back, ${user}!`;
        }
        
        const ctaBtn = document.querySelector(".cta-button");
        if (ctaBtn) {
            ctaBtn.textContent = "Browse New Tips";
            ctaBtn.href = "directory.html";
        }
    }
}

function showAlreadySubscribedMessage() {
    const main = document.querySelector("main");
    const user = localStorage.getItem("medoraUser");
    
    if (main) {
        main.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <h2>Welcome back, ${user}!</h2>
                <p>You are already subscribed to our newsletter.</p>
                <p>Check out the directory for the latest advice.</p>
                <a href="directory.html" class="cta-button" style="margin-top:20px; display:inline-block;">Go to Directory</a>
                <br><br>
                <button onclick="logout()" style="background:#ccc; border:none; padding:10px; cursor:pointer;">Not ${user}? Log out</button>
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem("medoraUser");
    location.reload();
}