const experiences = [
    {
        id: "ultimate-gamer",
        name: "Ultimate Gamer Pass",
        price: 1500,
        category: "Gaming package",
        description: "All-day access to full-spec gaming PCs and consoles, private lounges, high-speed fibre connection, and snack catering.",
        href: "ultimate-gamer.html",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85",
        details: "Get access to the ultimate setup in our main arena floor. Designed for professional-level set runs or intensive solo gaming bootcamps, this pass brings together high-performance equipment, comfort, and a full day of play.",
        includes: [["PC gaming", "Tournament-ready gaming PCs with high-refresh monitors."], ["Console gaming", "Current-generation consoles on large displays."], ["High-speed internet", "A dedicated connection for low-latency play."], ["Snack voucher", "A complimentary on-site snack voucher."], ["Tournament entry", "Entry into a daily arena tournament."]]
    },
    {
        id: "vip",
        name: "VIP Gaming Experience",
        price: 1500,
        category: "Gaming package",
        description: "Premium ultra-spec systems, priority booking, private booth lounge, food platters, and custom gaming merchandise.",
        href: "vip.html",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=85",
        details: "Enjoy premium private-booth gaming with ultra-spec systems and priority service. The VIP experience offers exclusive access to top-tier equipment and a more personal arena experience.",
        includes: [["Private booth lounge", "A private gaming booth with premium seating."], ["Ultra-spec PCs", "High-performance systems with 4K monitors."], ["Priority booking", "Flexible scheduling and priority reservation."], ["Food platters", "Snack and meal platters served to your booth."], ["Custom merchandise", "Next Level branded gaming gear."]]
    },
    {
        id: "esports",
        name: "Esports Training Package",
        price: 1500,
        category: "Gaming package",
        description: "Coaching with a professional player, performance analytics, VOD review, and full venue access.",
        href: "esports.html",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
        details: "Train with a dedicated coaching session from a professional esports player. Review your gameplay, study team performance, and put your practice into action in the arena.",
        includes: [["Pro coaching", "One-on-one or team coaching with a professional player."], ["Telemetry analytics", "Performance data and a post-session report."], ["VOD review", "Recorded gameplay review with strategic feedback."], ["Full venue access", "Access to gaming PCs and consoles during your session."], ["Practice arena", "A dedicated practice room with tournament equipment."]]
    },
    {
        id: "birthday",
        name: "Birthday Party Package",
        price: 1500,
        category: "Gaming package",
        description: "A private team room, food and drinks, a mini-tournament, custom trophies, and a dedicated party host.",
        href: "birthday.html",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85",
        details: "Make your birthday unforgettable with a dedicated gaming party at Next Level. Celebrate in your own team room with food, friendly competition, and a host to keep the event running smoothly.",
        includes: [["Dedicated team room", "A private party room with gaming setup."], ["Food and drinks", "A party catering package with snacks and beverages."], ["Mini-tournament", "A hosted tournament with live standings."], ["Custom trophies", "Gaming trophies for the winners."], ["Party host", "An event coordinator for your celebration."]]
    },
    {
        id: "vr",
        name: "Virtual Reality Experience",
        price: 750,
        category: "Individual experience",
        description: "Full motion tracking, a curated library of premium games, and technician setup support.",
        href: "vr.html",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=85",
        details: "Step into another world with cutting-edge VR platforms. Choose from a library of games and simulations, with a technician on hand for setup and guidance throughout your session.",
        includes: [["Full motion tracking", "Motion sensors for an immersive experience."], ["Premium game catalog", "A curated library of VR titles across genres."], ["Technician support", "Equipment setup and in-session assistance."], ["Private VR bay", "An enclosed station with space to play."], ["Session recording", "Optional capture of your gameplay highlights."]]
    },
    {
        id: "racing",
        name: "Racing Simulator Challenge",
        price: 750,
        category: "Individual experience",
        description: "Pro-motion rigs, panoramic surround screens, force-feedback steering, and lap-time tracking.",
        href: "racing.html",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=85",
        details: "Feel every turn and braking point on professional-grade racing simulator rigs. Panoramic screens, force-feedback steering, and motion platforms bring every lap to life.",
        includes: [["Pro-motion rig", "A racing cockpit with realistic motion simulation."], ["Surround screens", "Panoramic displays for peripheral vision."], ["Force feedback", "A precision steering wheel with realistic feedback."], ["Track selection", "A selection of real-world and fantasy tracks."], ["Lap timing", "Performance analytics and a leaderboard."]]
    },
    {
        id: "escape-room",
        name: "Escape Room Challenge",
        price: 750,
        category: "Individual experience",
        description: "An immersive interactive puzzle chamber designed to test communication and team coordination.",
        href: "escape-room.html",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
        details: "Test your team's problem-solving skills in an immersive interactive puzzle chamber. Combine clues, communication, and teamwork to beat the clock.",
        includes: [["Interactive puzzles", "Multi-layered physical and digital puzzle sequences."], ["Tech-enhanced rooms", "Projection, sensors, and interactive effects."], ["Team coordination", "Designed for groups working together."], ["Game master", "Live game master support and hints."], ["Debrief session", "A post-game recap and team photo opportunity."]]
    }
];

const bookingKey = "next-level-bookings";
const quoteKey = "next-level-last-quote";

function readBookings() {
    try {
        const saved = JSON.parse(localStorage.getItem(bookingKey) || "[]");
        return Array.isArray(saved) ? saved.filter((id) => experiences.some((item) => item.id === id)) : [];
    } catch {
        return [];
    }
}

function saveBookings(bookings) {
    try {
        localStorage.setItem(bookingKey, JSON.stringify(bookings));
    } catch {
        showToast("Your browser could not save this selection.");
    }
    updateBookingCount();
}

function formatPrice(value) {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
        maximumFractionDigits: 2
    }).format(value).replace("ZAR", "R");
}

function showToast(message) {
    let toast = document.querySelector(".site-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "site-toast";
        toast.setAttribute("role", "status");
        document.body.append(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function updateBookingCount() {
    const count = readBookings().length;
    document.querySelectorAll("[data-booking-count]").forEach((element) => {
        element.textContent = count;
        element.hidden = count === 0;
    });
}

function mountNavigation() {
    const header = document.querySelector("header");
    if (!header) return;

    const links = [
        ["Home", "homepage.html"],
        ["About Us", "about.html"],
        ["Summary", "packages.html"],
        ["Calculate Total Fees", "calculate-fees.html"],
        ["Contact Details", "contact.html"]
    ];
    const currentPage = location.pathname.split("/").pop() || "homepage.html";
    const normalizedPage = currentPage === "index.html" ? "homepage.html" : currentPage;
    const navLinks = links.map(([label, href]) => {
        const active = normalizedPage === href ? ' aria-current="page"' : "";
        return `<a href="${href}"${active}>${label}</a>`;
    }).join("");

    header.innerHTML = `
        <nav class="navbar" aria-label="Main navigation">
            <a class="logo" href="homepage.html" aria-label="Next Level Gaming home">
                <img src="images/Black Simple Creative Agency Logo (1) 1.png" alt="">
            </a>
            <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
                <span></span><span></span><span></span>
            </button>
            <div class="nav-links" id="primary-navigation">${navLinks}</div>
            <div class="nav-actions">
                <a class="booking-link" href="bookings.html" aria-label="My bookings">
                    My bookings <span class="booking-count" data-booking-count hidden>0</span>
                </a>
                <a class="nav-button" href="contact.html">Book now</a>
            </div>
        </nav>`;

    const toggle = header.querySelector(".menu-toggle");
    const navigation = header.querySelector(".nav-links");
    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        navigation.classList.toggle("is-open", !isOpen);
    });
}

function mountFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;
    footer.innerHTML = `
        <div class="footer-inner">
            <a class="logo" href="homepage.html" aria-label="Next Level Gaming home"><img src="images/Black Simple Creative Agency Logo (1) 1.png" alt=""></a>
            <p>Play. Compete. Connect.</p>
            <nav class="footer-links" aria-label="Footer navigation">
                <a class="footer-button" href="homepage.html">Home</a>
                <a class="footer-button" href="packages.html">Summary</a>
                <a class="footer-button" href="experiences.html">Experiences</a>
                <a class="footer-button" href="about.html">About Us</a>
                <a class="footer-button" href="bookings.html">My Bookings</a>
                <a class="footer-button" href="calculate-fees.html">Calculate Total Fees</a>
                <a class="footer-button" href="contact.html">Contact Details</a>
            </nav>
            <small class="copyright">&copy; 2026 Next Level Gaming &amp; Esports Arena.</small>
        </div>`;
}

function bookingSummary() {
    const bookings = readBookings();
    const subtotal = bookings.reduce((total, id) => total + experiences.find((item) => item.id === id).price, 0);
    const discountRate = bookings.length >= 4 ? 0.15 : bookings.length === 3 ? 0.10 : bookings.length === 2 ? 0.05 : 0;
    const discount = subtotal * discountRate;
    const vat = (subtotal - discount) * 0.15;
    return { bookings, subtotal, discountRate, discount, vat, total: subtotal - discount + vat };
}

function renderBookings() {
    const list = document.querySelector("[data-booking-list]");
    if (!list) return;

    const summary = bookingSummary();
    const emptyState = document.querySelector("[data-empty-bookings]");
    const summaryPanel = document.querySelector("[data-booking-summary]");
    list.innerHTML = summary.bookings.map((id) => {
        const item = experiences.find((experience) => experience.id === id);
        return `<article class="booking-row">
            <div><h3>${item.name}</h3><p>${item.description}</p></div>
            <strong class="price">${formatPrice(item.price)}</strong>
            <button class="remove-button" type="button" data-remove-booking="${item.id}" aria-label="Remove ${item.name}">Remove <span aria-hidden="true">&times;</span></button>
        </article>`;
    }).join("");

    if (emptyState) emptyState.hidden = summary.bookings.length > 0;
    if (summaryPanel) summaryPanel.hidden = summary.bookings.length === 0;
    document.querySelectorAll("[data-summary-count]").forEach((node) => node.textContent = `${summary.bookings.length} ${summary.bookings.length === 1 ? "item" : "items"}`);
    document.querySelectorAll("[data-summary-subtotal]").forEach((node) => node.textContent = formatPrice(summary.subtotal));
    document.querySelectorAll("[data-summary-discount]").forEach((node) => node.textContent = `${Math.round(summary.discountRate * 100)}% off`);
    document.querySelectorAll("[data-summary-total]").forEach((node) => node.textContent = formatPrice(summary.total));

    list.querySelectorAll("[data-remove-booking]").forEach((button) => {
        button.addEventListener("click", () => {
            saveBookings(readBookings().filter((id) => id !== button.dataset.removeBooking));
            renderBookings();
        });
    });
}

function renderBookingPage() {
    const main = document.querySelector('[data-page="bookings"]');
    if (!main) return;
    document.title = "My Bookings | Next Level Gaming";
    main.innerHTML = `
        <section class="page-intro compact-intro"><p class="eyebrow">YOUR SHORTLIST</p><h1>My bookings<span>.</span></h1><p>Keep your picks together and build a session that works for you.</p></section>
        <section class="bookings-layout"><div class="booking-list-wrap"><div class="catalog-toolbar"><span data-summary-count>0 items</span><a class="text-link" href="packages.html">Add an experience <span aria-hidden="true">+</span></a></div><div class="booking-list" data-booking-list></div><div class="empty-bookings" data-empty-bookings><span class="empty-mark" aria-hidden="true">+</span><h2>No bookings yet.</h2><p>Pick an experience and it will appear here.</p><a class="button button-outline" href="packages.html">Browse packages</a></div></div><aside class="booking-summary" data-booking-summary hidden><p class="eyebrow">YOUR ESTIMATE</p><h2>Booking summary</h2><div class="summary-line"><span>Subtotal</span><strong data-summary-subtotal>R0</strong></div><div class="summary-line"><span>Bundle discount</span><strong data-summary-discount>0% off</strong></div><div class="summary-line summary-total"><span>Estimated total <small>incl. VAT</small></span><strong data-summary-total>R0</strong></div><p class="summary-note">VAT is calculated at 15%. Final availability and pricing are confirmed by our team.</p><a class="button" href="calculate-fees.html">Calculate total fees <span aria-hidden="true">→</span></a></aside></section>`;
}

function renderFeePage() {
    const main = document.querySelector('[data-page="fees"]');
    if (!main) return;
    document.title = "Calculate Total Fees | Next Level Gaming";
    main.innerHTML = `
        <section class="page-intro compact-intro"><p class="eyebrow">PLAN YOUR SESSION</p><h1>Calculate total fees<span>.</span></h1><p>Select one or more experiences to see your estimated total.</p></section>
        <section class="fee-layout"><form class="fee-form" data-quote-form><div class="quote-section-heading"><div><p class="eyebrow">01 / CHOOSE EXPERIENCES</p><h2>Your selection</h2></div><span data-quote-selection-count>0 selected</span></div><div class="quote-options" data-quote-options></div><p class="discount-note" data-discount-note>Add 2 or more bookings to unlock a bundle discount.</p><div class="quote-section-heading quote-contact-heading"><div><p class="eyebrow">02 / YOUR DETAILS</p><h2>Where should we reach you?</h2></div></div><div class="form-grid"><label>Full name<input name="name" autocomplete="name" required placeholder="Your name"></label><label>Email address<input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label><label class="form-wide">Phone number<input name="phone" type="tel" autocomplete="tel" required placeholder="+27 00 000 0000"></label></div><p class="form-status" data-form-status role="status" aria-live="polite"></p><button class="button" type="submit">Request a quote <span aria-hidden="true">↗</span></button></form><aside class="quote-summary"><p class="eyebrow">ESTIMATE</p><h2>Your total</h2><div class="quote-lines" data-quote-lines><p class="quote-empty">Choose an experience to build your estimate.</p></div><div class="summary-line"><span>Subtotal</span><strong data-quote-subtotal>R0</strong></div><div class="summary-line"><span>Discount</span><strong data-quote-discount>-R0 (0%)</strong></div><div class="summary-line"><span>VAT <small>15%</small></span><strong data-quote-vat>R0</strong></div><div class="summary-line summary-total"><span>Total <small>incl. VAT</small></span><strong data-quote-total>R0</strong></div><p class="summary-note">Estimate only. Our team will confirm availability and final pricing.</p></aside></section>`;
}

function experienceCard(item, index) {
    return `<article class="experience-card" style="--card-index:${index}">
        <a class="experience-image" href="${item.href}" style="--card-image:url('${item.image}')" aria-label="View ${item.name}"><span class="card-arrow" aria-hidden="true">↗</span></a>
        <div class="experience-card-copy"><p class="eyebrow">${item.category}</p><h3><a href="${item.href}">${item.name}</a></h3><div class="card-bottom"><strong>${formatPrice(item.price)}<small> / session</small></strong><a class="text-link" href="${item.href}">Details <span aria-hidden="true">→</span></a></div></div>
    </article>`;
}

function renderHome() {
    const main = document.querySelector('[data-page="home"]');
    if (!main) return;
    main.innerHTML = `
        <section class="home-hero">
            <div class="home-hero-copy">
                <p class="eyebrow">JOHANNESBURG <span aria-hidden="true">·</span> EST. 2023</p>
                <h1>Level up <span>your next event</span></h1>
                <p>Experience South Africa's premier gaming and esports destination. Located in the heart of Johannesburg, Next Level offers world-class facilities customized for gaming events, competitive esports tournaments, birthday parties, school outings, and corporate team-building.</p>
                <a class="button" href="packages.html">View Packages &amp; Experiences <span aria-hidden="true">→</span></a>
            </div>
            <div class="home-hero-media">
                <img src="images/image%201.png" alt="Gaming PCs and equipment inside a gaming arena" fetchpriority="high">
            </div>
        </section>
        <section class="home-explore" aria-labelledby="home-explore-title">
            <div class="home-explore-heading"><p class="eyebrow">DISCOVER YOUR NEXT ADVENTURE</p><h2 id="home-explore-title">Explore</h2></div>
            <div class="home-explore-grid">
                <article class="home-explore-card"><h3>Gaming Packages</h3><p>Multi-hour experiences combining top-tier PC and console play, tournament configurations, and complimentary snack catering.</p><a href="packages.html">Read more <span aria-hidden="true">→</span></a></article>
                <article class="home-explore-card"><h3>Individual Experiences</h3><p>Step outside reality with our immersive VR platforms, professional racing simulators, and high-tech physical escape games.</p><a href="packages.html#individual-experiences">Read more <span aria-hidden="true">→</span></a></article>
                <article class="home-explore-card"><h3>Book a Consultant</h3><p>Let our team plan and scale your corporate team-building, birthday party, or school competitive outing.</p><a href="contact.html">Read more <span aria-hidden="true">→</span></a></article>
            </div>
        </section>`;
}

function renderCatalog() {
    const main = document.querySelector('[data-page="packages"], [data-page="experiences"]');
    if (!main) return;
    const packagesOnly = main.dataset.page === "packages";
    const packages = experiences.slice(0, 4);
    const individualExperiences = experiences.slice(4);
    const items = packagesOnly ? packages : individualExperiences;
    document.title = `${packagesOnly ? "Packages" : "Experiences"} | Next Level Gaming`;
    main.innerHTML = `
        <section class="page-intro${packagesOnly ? " summary-page-intro" : ""}"><p class="eyebrow">${packagesOnly ? "SUMMARY" : "PLAY IT YOUR WAY"}</p><h1>${packagesOnly ? "Gaming <span>Packages</span>" : "Experiences<span>.</span>"}</h1><p>${packagesOnly ? "Review our event packages. Perfect for larger parties, professional training runs, and individual gaming sessions." : "Try something new, take on a challenge, or put your skills to the test."}</p>${packagesOnly ? "" : '<span class="page-index">03 <i>/ 05</i></span>'}</section>
        <section class="catalog-section${packagesOnly ? " summary-catalog-section" : ""}"><div class="catalog-toolbar"><span>${items.length} ${packagesOnly ? "packages" : "experiences"}</span><a class="text-link" href="bookings.html">My bookings <span aria-hidden="true">→</span></a></div><div class="${packagesOnly ? "summary-package-grid" : "experience-grid"}">${items.map((item, index) => packagesOnly ? summaryCatalogCard(item, false, index) : experienceCard(item, index)).join("")}</div></section>
        ${packagesOnly ? `<section class="summary-individual" id="individual-experiences"><p class="eyebrow">LEVEL UP INDIVIDUALLY</p><h2>Individual Experiences</h2><div class="summary-experience-grid">${individualExperiences.map((item, index) => summaryCatalogCard(item, true, index)).join("")}</div></section>` : '<section class="catalog-switch"><p class="eyebrow">KEEP EXPLORING</p><h2>Make a day of it.</h2><a class="button button-outline" href="packages.html">See all packages <span aria-hidden="true">→</span></a></section>'}`;
}

function summaryCatalogCard(item, isIndividual, index) {
    return `<article class="summary-card${isIndividual ? " summary-card-individual" : ""}" style="--card-index:${index}">
        <div class="summary-card-heading"><h3>${item.name}</h3><strong>${formatPrice(item.price)}</strong></div>
        <p>${item.description}</p>
        <a class="small-button" href="${item.href}">${isIndividual ? "Configure booking" : "View details"} <span aria-hidden="true">→</span></a>
    </article>`;
}

function renderAbout() {
    const main = document.querySelector('[data-page="about"]');
    if (!main) return;
    main.innerHTML = `
        <section class="page-intro about-intro"><p class="eyebrow">WHO WE ARE</p><h1>Made for the<br><span>love of play.</span></h1><p>Next Level Gaming &amp; Esports Arena is a Johannesburg destination where gaming brings people together.</p><span class="page-index">01 <i>/ ABOUT</i></span></section>
        <section class="about-story"><div class="about-story-image" role="img" aria-label="Gaming community at Next Level"></div><div class="about-story-copy"><p class="eyebrow">OUR STORY</p><h2>Built by gamers.<br>Open to everyone.</h2><p>Founded in 2023 by gamer Jason Naidoo, Next Level was created to give players of every age and skill a place to explore modern gaming, grow their skills, and connect.</p><p>Today, the arena welcomes casual players, esports teams, schools, clubs, and businesses for shared experiences that bring people together.</p><a class="text-link" href="packages.html">Explore the arena <span aria-hidden="true">→</span></a></div></section>
        <section class="about-values"><p class="eyebrow">WHAT WE BELIEVE</p><h2>Play is better<br>together.</h2><div class="values-grid"><article><span>01</span><h3>Play</h3><p>Give every player a chance to discover something new.</p></article><article><span>02</span><h3>Compete</h3><p>Build confidence and skill through friendly competition.</p></article><article><span>03</span><h3>Connect</h3><p>Create a welcoming place for the whole gaming community.</p></article></div></section>`;
}

function renderContact() {
    const main = document.querySelector('[data-page="contact"]');
    if (!main) return;
    main.innerHTML = `
        <section class="page-intro contact-intro"><p class="eyebrow">WE'RE HERE TO HELP</p><h1>Contact<br><span>details.</span></h1><p>Questions about a session or planning an event? Send our team a message.</p></section>
        <section class="contact-layout"><div class="contact-details"><p class="eyebrow">GET IN TOUCH</p><h2>Let's make it happen.</h2><div class="contact-item"><span class="contact-icon" aria-hidden="true">↗</span><div><small>LOCATION</small><p>Johannesburg, South Africa</p></div></div><div class="contact-item"><span class="contact-icon" aria-hidden="true">⌕</span><div><small>PHONE</small><p>Contact the arena for bookings</p></div></div><div class="contact-item"><span class="contact-icon" aria-hidden="true">@</span><div><small>EMAIL</small><p>Send an enquiry using the form</p></div></div><div class="contact-item"><span class="contact-icon" aria-hidden="true">◷</span><div><small>OPENING HOURS</small><p>Contact the arena for current hours</p></div></div></div>
        <form class="contact-form" data-contact-form><p class="eyebrow">SEND A MESSAGE</p><div class="form-grid"><label>Full name<input name="name" autocomplete="name" required placeholder="Your name"></label><label>Email address<input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label><label>Phone number<input name="phone" type="tel" autocomplete="tel" required placeholder="+27"></label><label>I'm interested in<select name="experience" required><option value="">Choose an experience</option>${experiences.map((item) => `<option value="${item.id}">${item.name}</option>`).join("")}</select></label><label>Preferred date<input name="date" type="date"></label><label>Number of bookings<input name="count" type="number" min="1" value="1" required></label><label class="form-wide">Message<textarea name="message" rows="4" placeholder="Tell us a little about what you're planning..."></textarea></label></div><p class="form-status" data-contact-status role="status" aria-live="polite"></p><button class="button" type="submit">Send enquiry <span aria-hidden="true">↗</span></button></form></section>`;
}

function bindContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = form.querySelector("[data-contact-status]");
        status.textContent = "This enquiry has been prepared on this device. Contact details for the arena need to be configured before it can be delivered.";
        status.classList.add("is-success");
    });
}

function renderExperienceDetail() {
    const main = document.querySelector("[data-experience-detail]");
    if (!main) return;
    const item = experiences.find((experience) => experience.id === main.dataset.experienceDetail);
    if (!item) return;

    document.title = `${item.name} | Next Level Gaming`;
    main.innerHTML = `
        <section class="detail-layout">
            <div class="detail-copy">
                <p class="eyebrow">${item.category} <span>/</span> ${item.name}</p>
                <h1>${item.name}</h1>
                <p class="detail-price">${formatPrice(item.price)}</p>
                <img class="detail-image" src="${item.image}" alt="${item.name} at Next Level Gaming" fetchpriority="high">
                <p class="detail-description">${item.details}</p>
                <button class="button" type="button" data-add-booking="${item.id}">Add to booking <span aria-hidden="true">+</span></button>
            </div>
            <aside class="included-panel">
                <h2>What's included</h2>
                <div class="included-table" role="table" aria-label="What's included">
                    <div class="included-head" role="row"><span role="columnheader">Item</span><span role="columnheader">Details</span></div>
                    ${item.includes.map(([label, detail]) => `<div class="included-row" role="row"><strong role="cell">${label}</strong><span role="cell">${detail}</span></div>`).join("")}
                </div>
            </aside>
        </section>
        <section class="detail-next"><p class="eyebrow">Make it a session</p><h2>Build your booking</h2><p>Choose another experience or get an instant estimate for your selection.</p><div class="button-row"><a class="button button-outline" href="packages.html">Explore packages</a><a class="button" href="calculate-fees.html">Calculate total fees</a></div></section>`;
}

function renderQuoteOptions() {
    const options = document.querySelector("[data-quote-options]");
    if (!options) return;

    const selected = new Set(readBookings());
    options.innerHTML = experiences.map((item) => `
        <label class="quote-option">
            <input type="checkbox" name="experience" value="${item.id}" ${selected.has(item.id) ? "checked" : ""}>
            <span class="checkmark" aria-hidden="true"></span>
            <span>${item.name}</span>
            <strong>${formatPrice(item.price)}</strong>
        </label>`).join("");

    options.querySelectorAll("input").forEach((input) => input.addEventListener("change", updateQuote));
    updateQuote();
}

function updateQuote() {
    const form = document.querySelector("[data-quote-form]");
    if (!form) return;

    const selectedIds = [...form.querySelectorAll('input[name="experience"]:checked')].map((input) => input.value);
    const subtotal = selectedIds.reduce((total, id) => total + experiences.find((item) => item.id === id).price, 0);
    const discountRate = selectedIds.length >= 4 ? 0.15 : selectedIds.length === 3 ? 0.10 : selectedIds.length === 2 ? 0.05 : 0;
    const discount = subtotal * discountRate;
    const vat = (subtotal - discount) * 0.15;
    const total = subtotal - discount + vat;
    const lines = document.querySelector("[data-quote-lines]");

    if (lines) {
        lines.innerHTML = selectedIds.length
            ? selectedIds.map((id) => {
                const item = experiences.find((experience) => experience.id === id);
                return `<div class="quote-line"><span>${item.name}</span><span>${formatPrice(item.price)}</span></div>`;
            }).join("")
            : '<p class="quote-empty">Choose an experience to build your estimate.</p>';
    }
    setText("[data-quote-subtotal]", formatPrice(subtotal));
    setText("[data-quote-discount]", `-${formatPrice(discount)} (${Math.round(discountRate * 100)}%)`);
    setText("[data-quote-vat]", formatPrice(vat));
    setText("[data-quote-total]", formatPrice(total));
    setText("[data-quote-selection-count]", `${selectedIds.length} selected`);
    setText("[data-discount-note]", selectedIds.length >= 2
        ? `${selectedIds.length} bookings selected: ${Math.round(discountRate * 100)}% discount applied.`
        : "Add 2 or more bookings to unlock a bundle discount.");
    const status = document.querySelector("[data-form-status]");
    if (status && status.classList.contains("is-error")) {
        status.textContent = "";
        status.classList.remove("is-error");
    }

    form.dataset.selectedIds = JSON.stringify(selectedIds);
}

function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => node.textContent = value);
}

function bindBookingButtons() {
    document.querySelectorAll("[data-add-booking]").forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.addBooking;
            if (!experiences.some((item) => item.id === id)) return;
            const bookings = readBookings();
            if (bookings.includes(id)) {
                showToast("That experience is already in your bookings.");
                return;
            }
            bookings.push(id);
            saveBookings(bookings);
            showToast("Added to your bookings.");
            button.classList.add("is-added");
            button.textContent = "Added to bookings";
        });
    });
}

function bindQuoteForm() {
    const form = document.querySelector("[data-quote-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const selected = JSON.parse(form.dataset.selectedIds || "[]");
        const status = document.querySelector("[data-form-status]");
        if (selected.length === 0) {
            status.textContent = "Select at least one experience to request a quote.";
            status.classList.add("is-error");
            return;
        }

        const phone = form.querySelector('[name="phone"]');
        const digits = phone.value.replace(/\D/g, "");
        if (digits.length < 10 || digits.length > 15) {
            phone.setCustomValidity("Enter a valid phone number.");
            phone.reportValidity();
            return;
        }
        phone.setCustomValidity("");
        const quote = {
            name: form.querySelector('[name="name"]').value.trim(),
            email: form.querySelector('[name="email"]').value.trim(),
            phone: phone.value.trim(),
            experiences: selected,
            total: document.querySelector("[data-quote-total]").textContent,
            createdAt: new Date().toISOString()
        };
        try {
            localStorage.setItem(quoteKey, JSON.stringify(quote));
        } catch {
            // The on-screen confirmation still works when storage is unavailable.
        }
        status.textContent = "Quote saved in this browser. No request was sent; connect a booking service or email to deliver it to the arena.";
        status.classList.remove("is-error");
        status.classList.add("is-success");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mountNavigation();
    renderHome();
    renderCatalog();
    renderAbout();
    renderContact();
    renderBookingPage();
    renderFeePage();
    renderExperienceDetail();
    bindBookingButtons();
    renderBookings();
    renderQuoteOptions();
    bindQuoteForm();
    bindContactForm();
    updateBookingCount();
});