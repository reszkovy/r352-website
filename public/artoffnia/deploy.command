#!/bin/bash
cd "$(dirname "$0")"

# Inicjalizuj git jeśli nie istnieje
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

git add -A
git commit -m "fix: usunięto ikonę telefonu z dolnej belki fab"

# Deploy na Vercel
npx vercel --prod --yes

echo ""
echo "=== GOTOWE ==="
echo "Naciśnij dowolny klawisz, żeby zamknąć..."
read -n 1
