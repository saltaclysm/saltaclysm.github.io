# Black Site — Simple Vanilla HTML/CSS/JS

This is a tiny two-page site (landing + contact) with an all-black theme.

Files:

- `index.html` — Landing page
- `contact.html` — Contact page with basic contact info
- `css/styles.css` — Styles (all-black theme)
- `js/script.js` — Small helper script

How to view:

- Open `index.html` or `contact.html` in your browser (double-click or open from editor).

Notes:

- Header logo links to the landing page. Navigation has Home and Contact links.
- Contact page lists email, phone, address, and hours.

You can customize contact details in `contact.html`.

## Development (live reload)

Start a local development server with live reload (uses `live-server`):

```powershell
cd 'C:\Users\fajru\Desktop\Salt web'
npm run dev
```

This will open the site at http://127.0.0.1:8080 and automatically reload the page when files change.

### Adding your logo image

I didn't add the image file from the chat automatically. To use the logo you attached, save the image into the project at:

```
c:\Users\fajru\Desktop\Salt web\images\logo.jpg
```

You can do this by right-clicking the attached image in your chat client (or saving it from the message) and placing it into the new `images` folder. If you prefer a PNG, name it `logo.png` and update the `src` in the HTML accordingly.

Optional: add a favicon to avoid the 404 seen in the dev server by saving a `favicon.ico` file to the project root.
