from playwright.sync_api import sync_playwright

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge', headless=True)
        page = browser.new_page(viewport={'width': 390, 'height': 844})
        page.goto('http://localhost:8080/index.html', wait_until='networkidle')
        page.screenshot(path='scratch/mobile_viewport_updated.png')
        # scroll to process section
        process_el = page.locator('#process')
        if process_el.count() > 0:
            process_el.scroll_into_view_if_needed()
            page.wait_for_timeout(300)
            page.screenshot(path='scratch/mobile_process_section.png')
        browser.close()
    print('SCREENSHOTS_SAVED')

if __name__ == '__main__':
    capture()
