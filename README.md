# ClipGenius AI

Bengali-first YouTube video clipping interface powered by the LumiClip API.

## Setup
1. Import this private repository into Vercel.
2. Add the environment variable `LUMICLIP_API_KEY` to Production (and Preview if desired).
3. Deploy.

## API
- `POST /api/generate` — accepts a YouTube watch, shorts, embed, or youtu.be URL and starts a LumiClip project.
- `GET /api/project?id=<project_id>` — retrieves processing status and clips.
- `GET /api/usage` — optional usage endpoint; provider availability may vary.

The app does not download YouTube videos itself. Processing is performed by the configured third-party provider and depends on its current API, plan, and video permissions.
