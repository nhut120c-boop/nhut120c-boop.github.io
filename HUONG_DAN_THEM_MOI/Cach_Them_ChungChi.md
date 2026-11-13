# GUIDE: ADDING A NEW CERTIFICATE / EXHIBIT

Your website is designed to be fully automated! To add a new certificate or achievement to the Exhibits page, follow these 2 simple steps:

### STEP 1: Add your image/PDF file
Copy your certificate image or PDF and place it into:
`cer/` (or `assets/images/`).
Example: `cer/new_certificate.pdf`

### STEP 2: Add entry to configuration
Open `_data/exhibits.yml`.
Entries are categorized under `ctf:`, `ai:`, and `academic:`. Paste a template snippet under the appropriate section:

```yaml
  - title: "Competition or Certificate Name"
    stamp: "CERTIFICATE"
    date: "2026"
    description: >
      Detailed description of the achievement or award...
    meta: "Domain: CTF"
    cer: "/cer/new_certificate.pdf"
```

Save the file, then run `git add .`, `git commit -m "feat: add certificate"`, and `git push origin main`. The certificate will automatically display on the website!
