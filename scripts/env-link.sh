#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f .env.development ]]; then
  cp .env.development.example .env.development
  echo "created .env.development from .env.development.example — edit secrets"
fi

if [[ ! -f .env.production ]]; then
  cp .env.production.example .env.production
  echo "created .env.production from .env.production.example — edit secrets"
fi

for app in server web; do
  ln -sfn ../../.env.development "apps/${app}/.env.development"
  ln -sfn ../../.env.production "apps/${app}/.env.production"
  echo "linked apps/${app}/.env.development -> ../../.env.development"
  echo "linked apps/${app}/.env.production -> ../../.env.production"
done
