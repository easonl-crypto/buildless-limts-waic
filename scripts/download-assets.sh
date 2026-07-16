#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${ASSET_BASE_URL:-https://buildless-limits-waic.ruby-flute-4091.chatgpt.site}"

assets=(
  assets/coding-page.jpeg
  assets/home-visual.jpeg
  assets/pdfs/banke.pdf
  assets/pdfs/cramai.pdf
  assets/pdfs/miluo.pdf
  assets/pdfs/offercheck.pdf
  assets/pdfs/ouyang.pdf
  assets/pdfs/shadowcmo.pdf
  assets/pdfs/shopro-complete.pdf
  assets/pdfs/talentx.pdf
  assets/pdfs/xiaotian.pdf
  assets/pdfs/xiaozhi.pdf
  assets/posters/cramai-hq.webp
  assets/posters/guoguo.webp
  assets/posters/homecoming.webp
  assets/posters/offercheck.jpeg
  assets/posters/shadowcmo.jpeg
  assets/posters/shopro.jpeg
  assets/posters/talentx.jpeg
  assets/posters/wolf.webp
  assets/posters/yujian.webp
  assets/posters/zhuama.webp
  assets/ui/back-home-original.png
  assets/ui/community-hd.png
  assets/ui/community-hd.webp
  assets/ui/community-original.jpeg
  assets/ui/cramai-original.jpeg
  assets/ui/detail-cursor-hd.png
  assets/ui/detail-cursor.png
  assets/ui/follow-qr.webp
  assets/ui/home-art.png
  assets/ui/home-art.webp
  assets/ui/home-logo.png
  assets/ui/home-logo.webp
  assets/ui/vote-thumb-hd.png
  assets/ui/vote-thumb.png
  assets/videos/cramai-hq.mp4
  assets/videos/guoguo-hq.mp4
  assets/videos/homecoming-hq.mp4
  assets/videos/offercheck-hq.mp4
  assets/videos/shadowcmo-hq.mp4
  assets/videos/shopro-hq.mp4
  assets/videos/talentx-hq.mp4
  assets/videos/wolf-hq.mp4
  assets/videos/yujian-hq.mp4
  assets/videos/zhuama-hq.mp4
)

for asset in "${assets[@]}"; do
  destination="public/${asset}"
  mkdir -p "$(dirname "${destination}")"
  curl --fail --location --retry 3 --output "${destination}" "${BASE_URL}/${asset}"
done

echo "Downloaded ${#assets[@]} assets to public/assets/."
