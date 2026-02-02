/**
 * AI Chatbot Module for Yaki Restaurant
 * Provides personalized food/drink suggestions using Google Gemini API
 * Supports 5 languages: Vietnamese, English, Chinese, Japanese, Korean
 */

// ======================= AI CHATBOT CONFIG =======================
// IMPORTANT: After deploying your Cloudflare Worker, replace this URL with your actual Worker URL
// Example: https://gemini-proxy.your-subdomain.workers.dev
const AI_CHATBOT_CONFIG = {
    WORKER_URL: 'https://gemini-proxy.yaki-api.workers.dev'
};

// ======================= CHATBOT TRANSLATIONS =======================
const chatTranslations = {
    vi: {
        btnText: "🤖 AI Gợi ý",
        title: "🍽️ AI Gợi ý món",
        placeholder: "Nhập tin nhắn...",
        send: "Gửi",
        welcome: "Xin chào! Tôi là trợ lý AI của Yaki. Tôi sẽ giúp bạn chọn món ăn phù hợp.\n\nBạn có bao nhiêu người?",
        askBudget: "Tuyệt vời! {guests} người. Ngân sách của bạn là bao nhiêu? (VNĐ)",
        askAlcohol: "Ngân sách {budget}đ. Bạn có muốn đồng đồ uống có cồn không?\n👍 Nhấn = Có, Nhấn = Không",
        thinking: "Đang suy nghĩ gợi ý cho bạn...",
        suggestionIntro: "Dựa trên yêu cầu của bạn, tôi gợi ý:",
        confirmAdd: "\n\nBạn có muốn thêm các món này vào giỏ hàng?\n👍 Nhấn = Đồng ý, Nhấn = Không",
        addedToCart: "✅ Đã thêm các món vào giỏ hàng!",
        cancelled: "❌ Đã hủy. Bạn có muốn thử lại với yêu cầu khác không?\n\nNhập 'bắt đầu' để thử lại.",
        restart: "Bạn có bao nhiêu người?",
        goodbye: "Cảm ơn bạn! Chúc bạn dùng bữa ngon miệng! 🍜",
        invalidNumber: "Vui lòng nhập số hợp lệ.",
        invalidChoice: "Vui lòng chọn Có hoặc Không.",
        error: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại."
    },
    en: {
        btnText: "🤖 AI Suggest",
        title: "🍽️ AI Food Suggestion",
        placeholder: "Type your message...",
        send: "Send",
        welcome: "Hello! I'm Yaki's AI assistant. I'll help you choose the perfect dishes.\n\nHow many people are dining?",
        askBudget: "Great! {guests} people. What's your budget? (VND)",
        askAlcohol: "Budget {budget}đ. Would you like alcoholic drinks?\n👍 Press = Yes, Press = No",
        thinking: "Thinking of suggestions for you...",
        suggestionIntro: "Based on your preferences, I suggest:",
        confirmAdd: "\n\nWould you like to add these items to your cart?\n👍 Press = Yes, Press = No",
        addedToCart: "✅ Items added to cart!",
        cancelled: "❌ Cancelled. Would you like to try again with different preferences?\n\nType 'start' to restart.",
        restart: "How many people are dining?",
        goodbye: "Thank you! Enjoy your meal! 🍜",
        invalidNumber: "Please enter a valid number.",
        invalidChoice: "Please choose Yes or No.",
        error: "Sorry, an error occurred. Please try again."
    },
    zh: {
        btnText: "🤖 AI推荐",
        title: "🍽️ AI美食推荐",
        placeholder: "输入消息...",
        send: "发送",
        welcome: "你好！我是Yaki的AI助手。我将帮您选择完美的菜品。\n\n请问有几位用餐？",
        askBudget: "好的！{guests}位。您的预算是多少？（越南盾）",
        askAlcohol: "预算{budget}盾。您想要含酒精的饮料吗？\n👍 点击 = 是, 点击 = 否",
        thinking: "正在为您思考推荐...",
        suggestionIntro: "根据您的需求，我推荐：",
        confirmAdd: "\n\n您想将这些菜品加入购物车吗？\n👍 点击 = 是, 点击 = 否",
        addedToCart: "✅ 已添加到购物车！",
        cancelled: "❌ 已取消。您想用不同的偏好再试一次吗？\n\n输入'开始'重新开始。",
        restart: "请问有几位用餐？",
        goodbye: "谢谢！祝您用餐愉快！🍜",
        invalidNumber: "请输入有效的数字。",
        invalidChoice: "请选择是或否。",
        error: "抱歉，发生了错误。请重试。"
    },
    ja: {
        btnText: "🤖 AIおすすめ",
        title: "🍽️ AIおすすめ料理",
        placeholder: "メッセージを入力...",
        send: "送信",
        welcome: "こんにちは！Yakiのアシスタントです。最適な料理選びをお手伝いします。\n\n何名様でしょうか？",
        askBudget: "素晴らしい！{guests}名様ですね。ご予算はいくらですか？（VND）",
        askAlcohol: "ご予算{budget}ドン。アルコール飲料はご希望ですか？\n👍 押す = はい, 押す = いいえ",
        thinking: "おすすめを考えています...",
        suggestionIntro: "ご要望に基づき、おすすめします：",
        confirmAdd: "\n\nこれらをカートに追加しますか？\n👍 押す = はい, 押す = いいえ",
        addedToCart: "✅ カートに追加しました！",
        cancelled: "❌ キャンセルしました。別のご希望でやり直しますか？\n\n'開始'と入力してやり直し。",
        restart: "何名様でしょうか？",
        goodbye: "ありがとうございます！お食事をお楽しみください！🍜",
        invalidNumber: "有効な数字を入力してください。",
        invalidChoice: "はいまたはいいえを選択してください。",
        error: "申し訳ありませんが、エラーが発生しました。もう一度お試しください。"
    },
    ko: {
        btnText: "🤖 AI 추천",
        title: "🍽️ AI 음식 추천",
        placeholder: "메시지 입력...",
        send: "전송",
        welcome: "안녕하세요! Yaki AI 어시스턴트입니다. 완벽한 요리 선택을 도와드리겠습니다.\n\n몇 분이세요?",
        askBudget: "좋습니다! {guests}분이시네요. 예산은 얼마인가요? (VND)",
        askAlcohol: "예산 {budget}동. 알코올 음료를 원하시나요?\n👍 누름 = 예, 누름 = 아니오",
        thinking: "추천을 생각하고 있습니다...",
        suggestionIntro: "요청에 따라 추천드립니다:",
        confirmAdd: "\n\n이 항목들을 장바구니에 추가하시겠습니까?\n👍 누름 = 예, 누름 = 아니오",
        addedToCart: "✅ 장바구니에 추가되었습니다!",
        cancelled: "❌ 취소되었습니다. 다른 선호도로 다시 시도하시겠습니까?\n\n'시작'을 입력하여 다시 시작하세요.",
        restart: "몇 분이세요?",
        goodbye: "감사합니다! 맛있게 드세요! 🍜",
        invalidNumber: "유효한 숫자를 입력해 주세요.",
        invalidChoice: "예 또는 아니오를 선택해 주세요.",
        error: "죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요."
    }
};

// ======================= INJECT CSS =======================
function injectChatbotCSS() {
    const css = `
        /* ======================= AI CHATBOT ======================= */
        .ai-chat-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            padding: 8px 16px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .ai-chat-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        #aiChatPanel {
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%) scale(0.9);
            width: 380px;
            max-width: 95vw;
            max-height: 70vh;
            background: rgba(25, 25, 25, 0.95);
            backdrop-filter: blur(30px);
            border-radius: 20px;
            border: 1.5px solid rgba(102, 126, 234, 0.5);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            z-index: 1500;
            display: none;
            flex-direction: column;
            opacity: 0;
            transition: all 0.35s ease;
        }

        #aiChatPanel.show {
            display: flex;
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }

        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: linear-gradient(90deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
            border-radius: 20px 20px 0 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-header span:first-child {
            font-weight: bold;
            font-size: 16px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .close-chat-ai {
            font-size: 22px;
            color: #ff8080;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .close-chat-ai:hover { transform: scale(1.2); }

        #chatMessages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 250px;
            max-height: 350px;
        }

        .chat-message {
            padding: 12px 16px;
            border-radius: 16px;
            max-width: 85%;
            word-wrap: break-word;
            animation: messageSlide 0.3s ease;
            white-space: pre-line;
        }

        @keyframes messageSlide {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .chat-message.bot {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
            border: 1px solid rgba(102, 126, 234, 0.4);
            align-self: flex-start;
        }

        .chat-message.user {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            align-self: flex-end;
        }

        .chat-message.suggestion {
            background: linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.2));
            border: 1px solid rgba(74, 222, 128, 0.4);
            align-self: flex-start;
            max-width: 95%;
        }

        .suggestion-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .suggestion-item:last-child { border-bottom: none; }

        .chat-input-area {
            display: flex;
            gap: 10px;
            padding: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        #chatInput {
            flex: 1;
            padding: 12px 16px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        }

        #chatInput:focus { border-color: #667eea; }
        #chatInput::placeholder { color: rgba(255, 255, 255, 0.5); }

        .send-btn {
            padding: 12px 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            border-radius: 12px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .send-btn:hover { transform: scale(1.05); }

        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 12px 16px;
            align-self: flex-start;
        }

        .typing-indicator span {
            width: 8px;
            height: 8px;
            background: #667eea;
            border-radius: 50%;
            animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-8px); }
        }
    `;

    const style = document.createElement('style');
    style.id = 'ai-chatbot-styles';
    style.textContent = css;
    document.head.appendChild(style);
}

// ======================= INJECT HTML =======================
function injectChatbotHTML() {
    // Add AI Chat Button to header
    const headerControls = document.querySelector('.header-controls');
    if (headerControls) {
        const aiBtn = document.createElement('button');
        aiBtn.className = 'ai-chat-btn';
        aiBtn.id = 'aiChatBtn';
        aiBtn.onclick = toggleAiChat;
        aiBtn.innerHTML = chatTranslations[currentLang || 'vi'].btnText;
        headerControls.insertBefore(aiBtn, headerControls.firstChild);
    }

    // Add AI Chat Panel
    const chatPanel = document.createElement('div');
    chatPanel.id = 'aiChatPanel';
    chatPanel.innerHTML = `
        <div class="chat-header">
            <span id="chatTitle">${chatTranslations[currentLang || 'vi'].title}</span>
            <span class="close-chat-ai" onclick="toggleAiChat()">✖</span>
        </div>
        <div id="chatMessages"></div>
        <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="${chatTranslations[currentLang || 'vi'].placeholder}" onkeydown="if(event.key==='Enter')sendChatMessage()">
            <button class="send-btn" onclick="sendChatMessage()">${chatTranslations[currentLang || 'vi'].send}</button>
        </div>
    `;
    document.body.appendChild(chatPanel);
}

// ======================= CHAT STATE =======================
let chatState = {
    step: 'welcome', // welcome, guests, budget, alcohol, suggestion, confirm
    guests: 0,
    budget: 0,
    alcohol: false,
    suggestedItems: []
};

// ======================= CHAT FUNCTIONS =======================
function toggleAiChat() {
    const panel = document.getElementById('aiChatPanel');
    if (panel.classList.contains('show')) {
        panel.classList.remove('show');
        setTimeout(() => { panel.style.display = 'none'; }, 350);
    } else {
        panel.style.display = 'flex';
        setTimeout(() => { panel.classList.add('show'); }, 10);

        // Initialize chat if empty
        const messages = document.getElementById('chatMessages');
        if (messages.children.length === 0) {
            resetChatState();
            addBotMessage(chatTranslations[currentLang || 'vi'].welcome);
        }
    }
}

function resetChatState() {
    chatState = {
        step: 'guests',
        guests: 0,
        budget: 0,
        alcohol: false,
        suggestedItems: []
    };
}

function addBotMessage(text, isSuggestion = false) {
    const messages = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = `chat-message ${isSuggestion ? 'suggestion' : 'bot'}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
    const messages = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function showTypingIndicator() {
    const messages = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';

    processChatInput(text);
}

function processChatInput(text) {
    const lang = currentLang || 'vi';
    const t = chatTranslations[lang];

    switch (chatState.step) {
        case 'guests':
            const guests = parseInt(text);
            if (isNaN(guests) || guests < 1) {
                addBotMessage(t.invalidNumber);
                return;
            }
            chatState.guests = guests;
            chatState.step = 'budget';
            addBotMessage(t.askBudget.replace('{guests}', guests));
            break;

        case 'budget':
            const budget = parseInt(text.replace(/[.,]/g, ''));
            if (isNaN(budget) || budget < 1000) {
                addBotMessage(t.invalidNumber);
                return;
            }
            chatState.budget = budget;
            chatState.step = 'alcohol';
            addBotMessage(t.askAlcohol.replace('{budget}', budget.toLocaleString()));
            break;

        case 'alcohol':
            if (text !== '1' && text !== '0') {
                addBotMessage(t.invalidChoice);
                return;
            }
            chatState.alcohol = text === '1';
            chatState.step = 'suggestion';
            generateSuggestions();
            break;

        case 'confirm':
            if (text !== '1' && text !== '0') {
                addBotMessage(t.invalidChoice);
                return;
            }
            if (text === '1') {
                addSuggestionsToCart();
                addBotMessage(t.addedToCart);
                addBotMessage(t.goodbye);
                setTimeout(() => toggleAiChat(), 2000);
            } else {
                addBotMessage(t.cancelled);
                chatState.step = 'restart';
            }
            break;

        case 'restart':
            resetChatState();
            addBotMessage(t.restart);
            break;

        default:
            resetChatState();
            addBotMessage(t.welcome);
    }
}

async function generateSuggestions() {
    const lang = currentLang || 'vi';
    const t = chatTranslations[lang];

    showTypingIndicator();
    addBotMessage(t.thinking);

    try {
        // Build menu data for the prompt
        const menuData = buildMenuDataForPrompt();

        const prompt = buildSuggestionPrompt(menuData, lang);
        const response = await callGeminiAPI(prompt);

        hideTypingIndicator();

        // Parse and display suggestions
        const suggestions = parseSuggestions(response);
        chatState.suggestedItems = suggestions;

        displaySuggestions(suggestions, t);

    } catch (error) {
        hideTypingIndicator();
        console.error('AI suggestion error:', error);
        addBotMessage(t.error);
        chatState.step = 'restart';
    }
}

function buildMenuDataForPrompt() {
    const lang = currentLang || 'vi';
    let menuText = '';

    // Check if products exists (from parent page)
    if (typeof products !== 'undefined') {
        for (const category in products) {
            menuText += `\n[${category}]\n`;
            products[category].forEach(item => {
                menuText += `- ID:${item.id}, ${item.name[lang]}, ${item.price.toLocaleString()}đ\n`;
            });
        }
    }

    return menuText;
}

function buildSuggestionPrompt(menuData, lang) {
    const langNames = {
        vi: 'Vietnamese',
        en: 'English',
        zh: 'Chinese',
        ja: 'Japanese',
        ko: 'Korean'
    };

    return `You are a restaurant food suggestion AI for a Vietnamese BBQ & Hotpot restaurant called "Yaki".

Customer preferences:
- Number of guests: ${chatState.guests}
- Total budget: ${chatState.budget.toLocaleString()}đ (Vietnamese Dong)
- Alcohol preference: ${chatState.alcohol ? 'Yes, include alcoholic drinks' : 'No alcohol, only soft drinks and water'}

Restaurant Menu:
${menuData}

Please suggest a balanced meal for the group that:
1. Stays within budget (total cost should be close to but not exceed ${chatState.budget}đ)
2. Includes variety (grilled items, hotpot base, sides, drinks)
3. ${chatState.alcohol ? 'Includes alcoholic beverages' : 'Only includes non-alcoholic drinks'}
4. Provides appropriate portions for ${chatState.guests} people

IMPORTANT: Respond ONLY in ${langNames[lang]} language.

Format your response as a numbered list with EXACTLY this format:
1. [product ID] x [quantity] - [product name] - [unit price]đ

At the end, include:
TOTAL: [total amount]đ

Do not include any other text or explanations.`;
}

async function callGeminiAPI(prompt) {
    const response = await fetch(AI_CHATBOT_CONFIG.WORKER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt
        })
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.error || 'Unknown error');
    }

    return data.response;
}

function parseSuggestions(responseText) {
    const suggestions = [];
    const lines = responseText.split('\n');

    for (const line of lines) {
        // Match pattern: number. [ID] x [qty] - name - price
        const match = line.match(/\d+\.\s*\[?(\d+)\]?\s*x\s*(\d+)\s*-\s*(.+?)\s*-\s*([\d,\.]+)/);
        if (match) {
            const id = parseInt(match[1]);
            const qty = parseInt(match[2]);
            const name = match[3].trim();

            // Find product in menu
            const product = findProductById(id);
            if (product) {
                suggestions.push({
                    id: id,
                    name: product.name,
                    price: product.price,
                    qty: qty,
                    img: product.img
                });
            }
        }
    }

    return suggestions;
}

function findProductById(id) {
    if (typeof products !== 'undefined') {
        for (const category in products) {
            const found = products[category].find(p => p.id === id);
            if (found) return found;
        }
    }
    return null;
}

function displaySuggestions(suggestions, t) {
    const lang = currentLang || 'vi';

    let text = t.suggestionIntro + '\n\n';
    let total = 0;

    suggestions.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        text += `${index + 1}. ${item.name[lang]} x${item.qty}\n   ${item.price.toLocaleString()}đ × ${item.qty} = ${subtotal.toLocaleString()}đ\n`;
    });

    text += `\n━━━━━━━━━━━━━━━\nTổng/Total: ${total.toLocaleString()}đ`;
    text += t.confirmAdd;

    addBotMessage(text, true);
    chatState.step = 'confirm';
}

function addSuggestionsToCart() {
    // Add suggested items to the main page's cart
    if (typeof cart !== 'undefined' && typeof updateCart === 'function') {
        chatState.suggestedItems.forEach(item => {
            if (cart[item.id]) {
                cart[item.id].qty += item.qty;
            } else {
                cart[item.id] = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    qty: item.qty,
                    img: item.img
                };
            }
        });
        updateCart();

        if (typeof renderMenu === 'function') {
            renderMenu();
        }
    }
}

// ======================= LANGUAGE UPDATE =======================
function updateChatbotLanguage(lang) {
    const t = chatTranslations[lang];

    const btn = document.getElementById('aiChatBtn');
    if (btn) btn.innerHTML = t.btnText;

    const title = document.getElementById('chatTitle');
    if (title) title.textContent = t.title;

    const input = document.getElementById('chatInput');
    if (input) input.placeholder = t.placeholder;

    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn) sendBtn.textContent = t.send;
}

// ======================= INITIALIZATION =======================
function initAIChatbot() {
    injectChatbotCSS();
    injectChatbotHTML();

    // Hook into language change
    const originalLangHandler = document.getElementById('langSelect').onchange;
    document.getElementById('langSelect').addEventListener('change', function () {
        const langMap = {
            "Tiếng Việt": "vi", "English": "en", "中文": "zh", "日本語": "ja", "한국어": "ko"
        };
        const newLang = langMap[this.value] || 'vi';
        updateChatbotLanguage(newLang);
    });
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIChatbot);
} else {
    initAIChatbot();
}

// Export functions for global access
window.toggleAiChat = toggleAiChat;
window.sendChatMessage = sendChatMessage;
window.updateChatbotLanguage = updateChatbotLanguage;
