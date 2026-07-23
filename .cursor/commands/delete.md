---
description: Delete Cloudflare resources and GitHub repo; keep the local folder
---

# Delete

Tear down remote project resources. Never delete the local workspace.

## Safety

1. Resolve `<prefix>` (`package.json` name) and GitHub `nameWithOwner`
   (`gh repo view --json nameWithOwner`).
2. List Workers / D1 / KV / R2 / GitHub targets, then ask:

   > Are you sure you want to delete this project? If yes please reply
   > `delete this project <prefix>`

3. Only after that exact confirmation phrase — skip missing resources —
   delete in order:
   1. Workers `<prefix>-server`, `<prefix>-web`
   2. D1 `<prefix>` (real `database_id`, not zero placeholder)
   3. KV `<prefix>-cache` (config `id`)
   4. R2 `<prefix>` (`wrangler r2 bucket delete <prefix>`)
   5. `gh repo delete <owner>/<repo> --yes`
      (if scope fails: `gh auth refresh -h github.com -s delete_repo`)

4. Tell the user the local folder remains; they delete it themselves.

## Do not

- `rm -rf` the workspace
- Touch unrelated Cloudflare resources
- Proceed without the exact confirmation phrase
