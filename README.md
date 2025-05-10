# 🧱 HTMX + Material UI App Scaffold

The ultimate kickstart template for rapid, clean, and extensible web apps — built with **HTMX**, **Material UI**, and your favorite AI copilot in mind. Whether you're building single-page apps, multi-page admin panels, or AI-powered dashboards, this scaffold has your back.

---

## 🚀 Features That Slap

* 🔥 **HTMX for hyperspeed interactivity**
* 🎨 **Material UI (Google style)** for that clean, pro-grade look
* 🧩 **Partials for navbar, modal, footer, toast** (easy HTMX includes)
* 🗂️ **Multi-Page or Single-Page app support**
* 🧠 **AI-friendly CRUD helpers** for IndexedDB and Vercel APIs
* 🗃️ **Offline-first** with built-in IndexedDB logic
* ☁️ **Serverless-ready** with Vercel Postgres/KV/Blob support
* 📸 **Auto-snapshot generator** to markdown your structure

---

## 📦 Folder Structure

```bash
/public
  /pages
    index.html
    about.html
    /home (dashboard.html, profile.html)
    /admin (settings.html)
    /auth (login.html, register.html)
  /partials (navbar, footer, modal, toast, head)
/js (auth, db, ui, api, init)
/styles (material.css, custom.css)
/assets (logo.png)
/htmx (router.js, includes.js)
/vercel/api/auth (login.js, register.js)
/vercel/edge-functions.js
/snapshots (auto-generated markdown snapshots)
generate-snapshot.js
README.md
```

---

## 🧠 How It Works

### HTMX Partials

No page reloads. Just HTMX magic:

```html
<header hx-get="/partials/navbar.html" hx-trigger="load"></header>
```

### IndexedDB Helpers

Use natural JavaScript CRUD calls:

```js
createRecord('tasks', { title: 'Drink Coffee' });
readRecords('tasks');
```

### Auth (Vercel Edge API)

Simple email+password with KV storage:

* `POST /api/auth/register`
* `POST /api/auth/login`

---

## 🛠️ Get Started

```bash
node scaffold.js         # Generate full scaffold
node generate-snapshot.js  # Save structure snapshot
```

---

## 🧪 Built for AI + Dev Flow

This scaffold is designed to:

* Keep code modular and DRY
* Be human-readable and AI-editable
* Minimize dev friction and cognitive load

---

## 💥 Ready to Build?

Clone this repo and start your next app in seconds.

```bash
git clone https://github.com/YOUR_USERNAME/app-scaffold my-next-app
cd my-next-app
node scaffold.js
```

---

## ❤️ Credits

Made with love by [@leecharleslaing](https://github.com/leecharleslaing) and an overcaffeinated AI assistant.

---

## 📸 Snapshot Your Project Like a Pro

Want to keep track of your evolving file structure? Use the built-in snapshot tool to document every change like a versioned blueprint.

### 🧠 Why Snapshots Matter

This scaffold is built with AI-assisted workflows in mind. By regularly running `generate-snapshot.js`, you produce a clear, timestamped `.md` file that shows your exact file/folder layout. This lets you:

* 📎 Communicate current app structure with an AI (like me!)
* 🧠 Restore mental context after a break
* 🪄 Generate targeted help or refactors
* 🗃️ Create a snapshot journal for your project evolution

### 🔁 Recommended Workflow

```bash
node scaffold.js            # Create or update scaffold
node generate-snapshot.js   # Save a project snapshot (timestamped)
```

Each run saves a file like:

```
snapshots/project-snapshot-05-10-2025_10-37-51AM.md
```

You can send this snapshot to your AI assistant, use it in PRs, or even generate changelogs from it.

---

## 📸 Example Snapshot Output

Run this:

```bash
node generate-snapshot.js
```

You’ll get:

```markdown
# Project Structure

## public
- pages
  - index.html
  - about.html
  - auth
    - login.html
    - register.html
...
```

Let’s build the future one hyper-snappy component at a time.

---

🔥 **Star this repo if it saves your brainpower.**
