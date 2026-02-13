/**
 * ============================================================================
 * app.js — Tab Navigation Controller
 * Author : Huy Huynh (25560070)
 * ============================================================================
 *
 * Chức năng:
 *   - Chuyển đổi giữa các tab panel (Overview, Education, Projects, etc.)
 *   - Smooth fade-in animation khi chuyển tab
 *   - Keyboard navigation (Arrow keys) theo WAI-ARIA Tabs Pattern
 *   - Animate progress bars khi tab Skills được hiển thị
 *
 * ============================================================================
 */

"use strict";

/**
 * Khởi tạo khi DOM đã load xong.
 * DOMContentLoaded đảm bảo tất cả HTML element đã được parse trước khi JS truy cập.
 */
document.addEventListener("DOMContentLoaded", () => {
  /* ── Cache DOM elements ── */
  const tabButtons = document.querySelectorAll(".tabs__btn");
  const panels = document.querySelectorAll(".panel");

  /* Guard clause: nếu không có tabs thì thoát sớm */
  if (!tabButtons.length || !panels.length) return;

  /**
   * activateTab — Kích hoạt 1 tab và hiển thị panel tương ứng.
   *
   * @param {HTMLElement} selectedTab — Button tab được chọn.
   */
  function activateTab(selectedTab) {
    const targetId = selectedTab.dataset.target;
    if (!targetId) return;

    const targetPanel = document.getElementById(targetId);
    if (!targetPanel) return;

    /* Deactivate tất cả tabs */
    tabButtons.forEach((btn) => {
      btn.classList.remove("tabs__btn--active");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("tabindex", "-1");
    });

    /* Hide tất cả panels */
    panels.forEach((panel) => {
      panel.classList.remove("panel--active");
      panel.hidden = true;
    });

    /* Activate tab được chọn */
    selectedTab.classList.add("tabs__btn--active");
    selectedTab.setAttribute("aria-selected", "true");
    selectedTab.setAttribute("tabindex", "0");
    selectedTab.focus();

    /* Show panel tương ứng với fade-in animation */
    targetPanel.hidden = false;

    /* Trigger reflow để CSS transition chạy (force browser repaint) */
    void targetPanel.offsetHeight;

    targetPanel.classList.add("panel--active");

    /* Animate progress bars nếu đang ở tab Skills */
    if (targetId === "skills") {
      animateProgressBars(targetPanel);
    }
  }

  /**
   * animateProgressBars — Animate các thanh progress bar từ 0% → giá trị thực.
   * Chỉ chạy lần đầu tab Skills được hiển thị.
   *
   * @param {HTMLElement} panel — Panel chứa progress bars.
   */
  function animateProgressBars(panel) {
    const fills = panel.querySelectorAll(".progress__fill");

    fills.forEach((fill) => {
      const targetWidth = fill.dataset.level + "%";

      /* Reset về 0 rồi animate lên */
      fill.style.width = "0%";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.width = targetWidth;
        });
      });
    });
  }

  /* ── Click handler cho mỗi tab button ── */
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activateTab(btn);
    });
  });

  /* ── Keyboard navigation (WAI-ARIA Tabs Pattern) ──
     Arrow Left/Right: chuyển tab
     Home: tab đầu tiên
     End: tab cuối cùng
  */
  tabButtons.forEach((btn, index) => {
    btn.addEventListener("keydown", (event) => {
      const { key } = event;
      let newIndex = index;

      switch (key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          newIndex = (index + 1) % tabButtons.length;
          break;

        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
          break;

        case "Home":
          event.preventDefault();
          newIndex = 0;
          break;

        case "End":
          event.preventDefault();
          newIndex = tabButtons.length - 1;
          break;

        default:
          return; /* Không xử lý phím khác */
      }

      activateTab(tabButtons[newIndex]);
    });
  });

  /* ── Initialize: đảm bảo tab đầu tiên active khi load trang ── */
  const firstTab = tabButtons[0];
  if (firstTab) {
    activateTab(firstTab);
  }
});
