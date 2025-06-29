document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
    const chapterDetailScreen = document.getElementById("chapter-detail-screen");
    const welcomeScreen = document.getElementById("welcome-screen");
    const versesList = document.getElementById("verses-list");
    const dailySanskritVerse = document.getElementById("daily-sanskrit-verse");
    const dailyEnglishMeaning = document.getElementById("daily-english-meaning");
    const dailyVerseReference = document.getElementById("daily-verse-reference");
    const seeMoreVerseBtn = document.getElementById("see-more-verse");
    const chaptersList = document.getElementById("chapters-list");
    const detailChapterTitle = document.getElementById("detail-chapter-title");
    const detailChapterSummary = document.getElementById("detail-chapter-summary");
    const detailTotalVerses = document.getElementById("detail-total-verses");
    const backToChaptersBtn = document.getElementById("back-to-chapters-btn");
    const goToTopBtn = document.getElementById("go-to-top-btn");
    const themeToggleBtn = document.getElementById("theme-toggle");
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");
    let currentChapterNum = "";
    let currentVerses = [];
    let currentDailyVerse = null;
    const chaptersInfo = [
        { chapter_number: 1, name: { english: "Arjuna Visada Yoga" }, verses_count: 47, chapter_summary_english: "The first chapter of the Bhagavad Gita - \"Arjuna Vishada Yoga\" introduces the setup, the setting, the characters and the circumstances that led to the epic battle of Mahabharata, fought between the Pandavas and the Kauravas. It outlines the reasons that led to the revelation of the of Bhagavad Gita. As both armies stand ready for the battle, the mighty warrior Arjuna, on observing the warriors on both sides becomes increasingly sad and depressed due to the fear of losing his relatives and friends and the consequent sins attributed to killing his own relatives. So, he surrenders to Lord Krishna, seeking a solution. Thus, follows the wisdom of the Bhagavad Gita." },
        { chapter_number: 2, name: { english: "Sankhya Yoga" }, verses_count: 72, chapter_summary_english: "The second chapter of the Bhagavad Gita is \"Sankhya Yoga\". This is the most important chapter of the Bhagavad Gita as Lord Krishna condenses the teachings of the entire Gita in this chapter. This chapter is the essence of the entire Gita. \"Sankhya Yoga\" can be categorized into 4 main topics - 1. Arjuna completely surrenders himself to Lord Krishna and accepts his position as a disciple and Krishna as his Guru. He requests Krishna to guide him on how to dismiss his sorrow. 2. Explanation of the main cause of all grief, which is ignorance of the true nature of Self. 3. Karma Yoga - the discipline of selfless action without being attached to its fruits. 4. Description of a Perfect Man - One whose mind is steady and one-pointed." },
        { chapter_number: 3, name: { english: "Karma Yoga" }, verses_count: 43, chapter_summary_english: "The third chapter of the Bhagavad Gita is \"Karma Yoga\" or the \"Path of Selfless Service\". Here Lord Krishna emphasizes the importance of karma in life. He reveals that it is important for every human being to engage in some sort of activity in this material world. Further, he describes the kinds of actions that lead to bondage and the kinds that lead to liberation. Those persons who continue to perform their respective duties externally for the pleasure of the Supreme, without attachment to its rewards get liberation at the end." },
        { chapter_number: 4, name: { english: "Jnana Karma Sanyasa Yoga" }, verses_count: 42, chapter_summary_english: "The fourth chapter of the Bhagavad Gita is \"Jnana Karma Sanyasa Yoga\". In this chapter, Krishna glorifies the Karma Yoga and imparts the Transcendental Knowledge (the knowledge of the soul and the Ultimate Truth) to Arjuna. He reveals the reason behind his appearance in this material world. He reveals that even though he is eternal, he reincarnates time after time to re-establish dharma and peace on this Earth. His births and activities are eternal and are never contaminated by material flaws. Those persons who know and understand this Truth engage in his devotion with full faith and eventually attain Him. They do not have to take birth in this world again." },
        { chapter_number: 5, name: { english: "Karma Sanyasa Yoga" }, verses_count: 29, chapter_summary_english: "The fifth chapter of the Bhagavad Gita is \"Karma Sanyasa Yoga\". In this chapter, Krishna compares the paths of renunciation in actions (Karma Sanyas) and actions with detachment (Karma Yoga) and explains that both are means to reach the same goal and we can choose either. A wise person should perform his/her worldly duties without attachment to the fruits of his/her actions and dedicate them to God. This way they remain unaffected by sin and eventually attain liberation." },
        { chapter_number: 6, name: { english: "Dhyana Yoga" }, verses_count: 47, chapter_summary_english: "The sixth chapter of the Bhagavad Gita is \"Dhyana Yoga\". In this chapter, Krishna reveals the \"Yoga of Meditation\" and how to practise this Yoga. He discusses the role of action in preparing for Meditation, how performing duties in devotion purifies one's mind and heightens one's spiritual consciousness. He explains in detail the obstacles that one faces when trying to control their mind and the exact methods by which one can conquer their mind. He reveals how one can focus their mind on Paramatma and unite with the God." },
        { chapter_number: 7, name: { english: "Gyaan Vigyana Yoga" }, verses_count: 30, chapter_summary_english: "The seventh chapter of the Bhagavad Gita is \"Gyaan Vigyana Yoga \". In this chapter, Krishna reveals that he is the Supreme Truth, the principal cause and the sustaining force of everything. He reveals his illusionary energy in this material world called Maya, which is very difficult to overcome but those who surrender their minds unto Him attain Him easily. He also describes the four types of people who surrender to Him in devotion and the four kinds that don't. Krishna confirms that He is the Ultimate Reality and those who realize this Truth reach the pinnacle of spiritual realization and unite with the Lord." },
        { chapter_number: 8, name: { english: "Akshara Brahma Yoga" }, verses_count: 28, chapter_summary_english: "The eighth chapter of the Bhagavad Gita is \"Akshara Brahma Yoga\". In this chapter, Krishna reveals the importance of the last thought before death. If we can remember Krishna at the time of death, we will certainly attain him. Thus, it is very important to be in constant awareness of the Lord at all times, thinking of Him and chanting His names at all times. By perfectly absorbing their mind in Him through constant devotion, one can go beyond this material existence to Lord's Supreme abode." },
        { chapter_number: 9, name: { english: "Raja Vidya Yoga" }, verses_count: 34, chapter_summary_english: "The ninth chapter of the Bhagavad Gita is \"Raja Vidya Yoga\". In this chapter, Krishna explains that He is Supreme and how this material existence is created, maintained and destroyed by His Yogmaya and all beings come and go under his supervision. He reveals the Role and the Importance of Bhakti (transcendental devotional service) towards our Spiritual Awakening. In such devotion, one must live for the God, offer everything that he possesses to Him and do everything for Him only. One who follows such devotion becomes free from the bonds of this material world and unites with the Lord." },
        { chapter_number: 10, name: { english: "Vibhooti Yoga" }, verses_count: 42, chapter_summary_english: "The tenth chapter of the Bhagavad Gita is \"Vibhooti Yoga\". In this chapter, Krishna reveals Himself as the cause of all causes. He describes His various manifestations and opulences in order to increase Arjuna's Bhakti. Arjuna is fully convinced of Lord's paramount position and proclaims him to be the Supreme Personality. He prays to Krishna to describe more of His divine glories which are like nectar to hear." },
        { chapter_number: 11, name: { english: "Vishwaroopa Darshana Yoga" }, verses_count: 55, chapter_summary_english: "The eleventh chapter of the Bhagavad Gita is \"Vishwaroopa Darshana Yoga\". In this chapter, Arjuna requests Krishna to reveal His Universal Cosmic Form that encompasses all the universes, the entire existence. Arjuna is granted divine vision to be able to see the entirety of creation in the body of the Supreme Lord Krishna." },
        { chapter_number: 12, name: { english: "Bhakti Yoga" }, verses_count: 20, chapter_summary_english: "The twelfth chapter of the Bhagavad Gita is \"Bhakti Yoga\". In this chapter, Krishna emphasizes the superiority of Bhakti Yoga (the path of devotion) over all other types of spiritual disciplines and reveals various aspects of devotion. He further explains that the devotees who perform pure devotional service to Him, with their consciousness, merged in Him and all their actions dedicated to Him, are quickly liberated from the cycle of life and death. He also describes the various qualities of the devotees who are very dear to Him." },
        { chapter_number: 13, name: { english: "Ksetra Ksetrajna Vibhaaga Yoga" }, verses_count: 35, chapter_summary_english: "The thirteenth chapter of the Bhagavad Gita is \"Ksetra Ksetrajna Vibhaaga Yoga\". The word \"kshetra\" means \"the field\", and the \"kshetrajna\" means \"the knower of the field\". We can think of our material body as the field and our immortal soul as the knower of the field. In this chapter, Krishna discriminates between the physical body and the immortal soul. He explains that the physical body is temporary and perishable whereas the soul is permanent and eternal. The physical body can be destroyed but the soul can never be destroyed. The chapter then describes God, who is the Supreme Soul. All the individual souls have originated from the Supreme Soul. One who clearly understands the difference between the body, the Soul and the Supreme Soul attains the realization of Brahman." },
        { chapter_number: 14, name: { english: "Gunatraya Vibhaga Yoga" }, verses_count: 27, chapter_summary_english: "The fourteenth chapter of the Bhagavad Gita is \"Gunatraya Vibhaga Yoga\". In this chapter, Krishna reveals the three gunas (modes) of the material nature - goodness, passion and ignorance which everything in the material existence is influenced by. He further explains the essential characteristics of each of these modes, their cause and how they influence a living entity affected by them. He then reveals the various characteristics of the persons who have gone beyond these gunas. The chapter ends with Krishna reminding us of the power of pure devotion to God and how attachment to God can help us transcend these gunas." },
        { chapter_number: 15, name: { english: "Purushottama Yoga" }, verses_count: 20, chapter_summary_english: "The fifteenth chapter of the Bhagavad Gita is \"Purushottama Yoga\". In Sanskrit, Purusha means the \"All-pervading God\", and Purushottam means the timeless & transcendental aspect of God. Krishna reveals that the purpose of this Transcendental knowledge of the God is to detach ourselves from the bondage of the material world and to understand Krishna as the Supreme Divine Personality, who is the eternal controller and sustainer of the world. One who understands this Ultimate Truth surrenders to Him and engages in His devotional service." },
        { chapter_number: 16, name: { english: "Daivasura Sampad Vibhaga Yoga" }, verses_count: 24, chapter_summary_english: "The sixteenth chapter of the Bhagavad Gita is \"Daivasura Sampad Vibhaga Yoga\". In this chapter, Krishna describes explicitly the two kinds of natures among human beings - divine and demoniac. Those who possess demonaic qualities associate themselves with the modes of passion and ignorance do not follow the regulations of the scriptures and embrace materialistic views. These people attain lower births and further material bondage. But people who possess divine qualities, follow the instructions of the scriptures, associate themselves with the mode of goodness and purify the mind through spiritual practices. This leads to the enhancement of divine qualities and they eventually attain spiritual realization." },
        { chapter_number: 17, name: { english: "Sraddhatraya Vibhaga Yoga" }, verses_count: 28, chapter_summary_english: "The seventeenth chapter of the Bhagavad Gita is \"Sraddhatraya Vibhaga Yoga\". In this chapter, Krishna describes the three types of faith corresponding to the three modes of the material nature. Lord Krishna further reveals that it is the nature of faith that determines the quality of life and the character of living entities. Those who have faith in passion and ignorance perform actions that yield temporary, material results while those who have faith in goodness perform actions in accordance with scriptural instructions and hence their hearts get further purified." },
        { chapter_number: 18, name: { english: "Moksha Sanyaas Yoga" }, verses_count: 78, chapter_summary_english: "The eighteenth chapter of the Bhagavad Gita is \"Moksha Sanyas Yoga\". Arjuna requests the Lord to explain the difference between the two types of renunciations - sanyaas(renunciation of actions) and tyaag(renunciation of desires). Krishna explains that a sanyaasi is one who abandons family and society in order to practise spiritual discipline whereas a tyaagi is one who performs their duties without attachment to the rewards of their actions and dedicating them to the God. Krishna recommends the second kind of renunciation - tyaag. Krishna then gives a detailed analysis of the effects of the three modes of material nature. He declares that the highest path of spirituality is pure, unconditional loving service unto the Supreme Divine Personality, Krishna. If we always remember Him, keep chanting His name and dedicate all our actions unto Him, take refuge in Him and make Him our Supreme goal, then by His grace, we will surely overcome all obstacles and difficulties and be freed from this cycle of birth and death." }
    ];
    function animateElements(elements, delayMultiplier = 100) {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.animation = `fadeSlideIn 0.5s ease-out ${index * delayMultiplier}ms forwards`;
        });
    }
    function toggleFixedButtonsVisibility() {
        const isChapterDetailVisible = !chapterDetailScreen.classList.contains('hidden');
        if (isChapterDetailVisible) {
            backToChaptersBtn.classList.remove('hidden');
            if (window.scrollY > 200) {
                goToTopBtn.classList.remove('hidden');
            } else {
                goToTopBtn.classList.add('hidden');
            }
        } else {
            backToChaptersBtn.classList.add('hidden');
            goToTopBtn.classList.add('hidden');
        }
    }
    async function loadVerseOfTheDay() {
        try {
            const randomChapterInfo = chaptersInfo[Math.floor(Math.random() * chaptersInfo.length)];
            const randomChapterNum = randomChapterInfo.chapter_number;
            const randomVerseNum = Math.floor(Math.random() * randomChapterInfo.verses_count) + 1;
            const response = await fetch(`https://vedicscriptures.github.io/slok/${randomChapterNum}/${randomVerseNum}`);
            if (response.ok) {
                const verse = await response.json();
                currentDailyVerse = verse;
                dailySanskritVerse.textContent = verse.slok || "N/A";
                dailyEnglishMeaning.textContent = (verse.prabhu && verse.prabhu.et) ? verse.prabhu.et : (verse.siva && verse.siva.et ? verse.siva.et : "English meaning not available");
                dailyVerseReference.textContent = `Chapter ${verse.chapter || verse.sc}, Verse ${verse.verse || verse.vc}`;
            } else {
                dailySanskritVerse.textContent = "Failed to load verse of the day.";
                console.error("Error fetching random verse:", response.status);
            }
        } catch (error) {
            dailySanskritVerse.textContent = "Failed to load verse of the day.";
            console.error("Error fetching random verse:", error);
        }
    }
    function loadChaptersGrid() {
        chaptersList.innerHTML = "";
        chaptersInfo.forEach((chapter) => {
            const card = document.createElement("div");
            card.className = "chapter-card";
            card.dataset.chapter = chapter.chapter_number;
            card.innerHTML = `
    <h4 class="chapter-card-title">Chapter ${chapter.chapter_number}: ${chapter.name.english}</h4>
    <p class="chapter-card-summary line-clamp-3">${chapter.chapter_summary_english || 'No summary available.'}</p>
    <div class="chapter-card-footer">
    <span class="chapter-card-verse-count">${chapter.verses_count} Verses</span>
    <button class="chapter-card-button">Read Chapter</button>
    </div>`;
            card.addEventListener("click", () => {
                loadChapterVerses(chapter.chapter_number);
            });
            chaptersList.appendChild(card);
        });
        animateElements(document.querySelectorAll('.chapter-card'), 50);
        toggleFixedButtonsVisibility();
    }
    async function loadChapterVerses(chapterNumber) {
        currentChapterNum = chapterNumber;
        const chapterInfo = chaptersInfo.find((ch) => ch.chapter_number == chapterNumber);
        detailChapterTitle.textContent = `Chapter ${chapterNumber}: ${chapterInfo.name.english}`;
        detailChapterSummary.textContent = chapterInfo.chapter_summary_english;
        detailTotalVerses.textContent = chapterInfo.verses_count;
        welcomeScreen.classList.add("hidden");
        chapterDetailScreen.classList.add("hidden");
        loader.classList.remove("hidden");
        versesList.innerHTML = "";
        currentVerses = [];
        try {
            const totalVerses = chapterInfo.verses_count;
            const fetchPromises = [];
            for (let i = 1; i <= totalVerses; i++) {
                fetchPromises.push(
                    fetch(`https://vedicscriptures.github.io/slok/${chapterNumber}/${i}`)
                        .then((res) => {
                            if (!res.ok) {
                                console.error(`API Error: Failed to fetch verse ${chapterNumber}:${i}. Status: ${res.status}`);
                                return null;
                            }
                            return res.json();
                        })
                        .catch((err) => {
                            console.error(`Fetch error for verse ${chapterNumber}:${i}`, err);
                            return null;
                        })
                );
            }
            const versesArray = await Promise.all(fetchPromises);
            currentVerses = versesArray.filter((v) => v !== null);
            displayVerses();
            loader.classList.add("hidden");
            chapterDetailScreen.classList.remove("hidden");
            document.getElementById('about-gita-section').classList.add('hidden');
            document.getElementById('verse-of-day-section').classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toggleFixedButtonsVisibility();
        } catch (err) {
            console.error("Error loading chapter verses:", err);
            alert("Failed to fetch verses. Please try again.");
            loader.classList.add("hidden");
            welcomeScreen.classList.remove("hidden");
            toggleFixedButtonsVisibility();
        }
    }
    function displayVerses() {
        versesList.innerHTML = "";
        if (currentVerses.length === 0) {
            versesList.innerHTML = '<p class="text-center text-gray-600 col-span-full">No verses found for this chapter.</p>';
            return;
        }
        currentVerses.forEach((verse) => {
            const chapterId = String(verse.chapter !== undefined ? verse.chapter : (verse.sc !== undefined ? verse.sc : 'UnknownChapter'));
            const verseId = String(verse.verse !== undefined ? verse.verse : (verse.vc !== undefined ? verse.vc : 'UnknownVerse'));
            const verseCard = document.createElement("div");
            verseCard.className = "verse-card";
            verseCard.dataset.verseRef = `${chapterId}-${verseId}`;
            const primaryEnglish = (verse.prabhu && verse.prabhu.et) || (verse.siva && verse.siva.et) || "English meaning not available";
            let allHindiHtml = "";
            const hindiAuthors = [
                { key: "tej", property: "ht", author: "Swami Tejomayananda" },
                { key: "rams", property: "ht", author: "Swami Ramsukhdas" },
                { key: "chinmay", property: "hc", author: "Swami Chinmayananda (Hindi Commentary)" }
            ];
            let hindiContentExists = false;
            hindiAuthors.forEach((author) => {
                if (verse[author.key] && verse[author.key][author.property] && verse[author.key][author.property].trim() !== '') {
                    allHindiHtml += `<div class="mb-3"><h5 class="font-semibold text-gray-700">${author.author}:</h5><p class="text-lg text-gray-800">${verse[author.key][author.property]}</p></div>`;
                    hindiContentExists = true;
                }
            });
            if (!hindiContentExists) {
                allHindiHtml = `<p class="text-md text-gray-600">Hindi translation not available from listed authors.</p>`;
            }
            let allEnglishHtml = "";
            const englishAuthors = [
                { key: "siva", property: "et", author: "Swami Sivananda" },
                { key: "purohit", property: "et", author: "Shri Purohit Swami" },
                { key: "san", property: "et", author: "Dr. S. Sankaranarayan" },
                { key: "adi", property: "et", author: "Swami Adidevananda" },
                { key: "gambir", property: "et", author: "Swami Gambirananda" },
                { key: "raman", property: "et", author: "Sri Ramanuja" },
                { key: "abhinav", property: "et", author: "Sri Abhinav Gupta" }
            ];
            let englishContentExists = false;
            englishAuthors.forEach((author) => {
                const translation = verse[author.key] && verse[author.key][author.property];
                if (translation && typeof translation === 'string' && translation.trim() !== '' && translation !== primaryEnglish) {
                    allEnglishHtml += `<div class="mb-3"><h5 class="font-semibold text-gray-700">${author.author}:</h5><p class="text-lg text-gray-800">${translation}</p></div>`;
                    englishContentExists = true;
                }
            });
            if (!englishContentExists) {
                allEnglishHtml = `<p class="text-md text-gray-600">No additional English commentaries available.</p>`;
            }
            const transliteration = verse.transliteration || verse.en || "";
            let translitHtml = "";
            if (transliteration && typeof transliteration === "string" && transliteration.trim() !== "") {
                translitHtml = `
    <h4 class="verse-sanskrit-transliteration-title">Sanskrit Transliteration:</h4>
    <p class="verse-sanskrit-transliteration-text">${transliteration}</p>
    `;
            }
            verseCard.innerHTML = `
    <h3 class="verse-card-title">Verse ${chapterId}.${verseId}</h3>
    <div class="verse-main-content">
    <h4 class="verse-sanskrit-sloka-title">Sanskrit Sloka:</h4>
    <p class="verse-sanskrit-sloka-text">${verse.slok || 'Sanskrit text not available'}</p>
    <h4 class="verse-english-meaning-title">English Meaning:</h4>
    <p class="verse-english-meaning-text">${primaryEnglish}</p>
    </div>
    <button class="view-more-commentary-btn">View More Commentaries</button>
    <div class="additional-commentaries">
    ${translitHtml}
    <h4 class="additional-english-commentary-title">English Commentaries:</h4>
    ${allEnglishHtml}
    <h4 class="additional-hindi-commentary-title">Hindi Translations/Commentaries:</h4>
    ${allHindiHtml}
    </div>
    `;
            versesList.appendChild(verseCard);
        });
        animateElements(document.querySelectorAll('.verse-card'), 50);
    }
    versesList.addEventListener("click", (event) => {
        if (event.target.classList.contains("view-more-commentary-btn")) {
            const button = event.target;
            const parentCard = button.closest(".verse-card");
            if (parentCard) {
                const additionalDiv = parentCard.querySelector(".additional-commentaries");
                if (additionalDiv) {
                    additionalDiv.classList.toggle("active");
                    if (additionalDiv.classList.contains("active")) {
                        button.textContent = "View Less Commentaries";
                    } else {
                        button.textContent = "View More Commentaries";
                    }
                }
            }
        }
    });
    seeMoreVerseBtn.addEventListener("click", () => {
        if (currentDailyVerse) {
            loadChapterVerses(currentDailyVerse.chapter || currentDailyVerse.sc).then(() => {
                const dailyVerseRef = `${currentDailyVerse.chapter || currentDailyVerse.sc}-${currentDailyVerse.verse || currentDailyVerse.vc}`;
                const targetCard = document.querySelector(`[data-verse-ref="${dailyVerseRef}"]`);
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                    const btn = targetCard.querySelector(".view-more-commentary-btn");
                    const additionalDiv = targetCard.querySelector(".additional-commentaries");
                    if (btn && additionalDiv && !additionalDiv.classList.contains("active")) {
                        btn.click();
                    }
                }
            });
        } else {
            alert("Verse of the day not loaded yet. Please wait.");
        }
    });
    goToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById("back-to-chapters-btn").addEventListener("click", () => {
        chapterDetailScreen.classList.add("hidden");
        welcomeScreen.classList.remove("hidden");
        loadChaptersGrid();
        toggleFixedButtonsVisibility();
    });
    window.addEventListener('scroll', toggleFixedButtonsVisibility);
    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            sunIcon.classList.add("hidden");
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove("dark");
            sunIcon.classList.remove("hidden");
            moonIcon.classList.add('hidden');
        }
        localStorage.setItem("theme", theme);
    };
    let savedTheme = localStorage.getItem("theme");
if (!savedTheme) {
    savedTheme = "dark"; // Default to dark if no preference set
}
applyTheme(savedTheme);
    document.getElementById("theme-toggle").addEventListener("click", () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            applyTheme("light");
        } else {
            applyTheme("dark");
        }
    });
    loadVerseOfTheDay();
    loadChaptersGrid();
    toggleFixedButtonsVisibility();
});
