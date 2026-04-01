<template>
  <div>
    <iframe
        width="100%"
        height="100%"
        :src="videoUrl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  videoLink: String
});

const videoUrl = computed(() => transformLink(props.videoLink));

const DZEN_EMBED_DEFAULTS = {
  from_block: 'partner',
  from: 'zen',
  mute: '0',
  autoplay: '0',
  tv: '0'
};

/** VK iframe embed: canonical host is vkvideo.ru (same params as vk.com/video_ext.php). */
const VK_VIDEO_EMBED = 'https://vkvideo.ru/video_ext.php';

function normalizeInput(link) {
  const t = (link || '').trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function hostKey(hostname) {
  return (hostname || '').replace(/^www\./i, '').toLowerCase();
}

function parseVkVideoRef(str) {
  const m = String(str).match(/video-(-?\d+)_(\d+)/);
  if (!m) return null;
  return { oid: '-' + m[1], id: m[2] };
}

function transformYoutube(link) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = link.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return '';
}

function transformVk(url) {
  if (url.pathname.includes('video_ext.php')) {
    const oid = url.searchParams.get('oid');
    const id = url.searchParams.get('id');
    if (oid != null && oid !== '' && id != null && id !== '') {
      const u = new URL(VK_VIDEO_EMBED);
      u.searchParams.set('oid', oid);
      u.searchParams.set('id', id);
      url.searchParams.forEach((v, k) => {
        if (k !== 'oid' && k !== 'id') u.searchParams.set(k, v);
      });
      if (!u.searchParams.has('autoplay')) u.searchParams.set('autoplay', '1');
      return u.toString();
    }
  }

  const z = url.searchParams.get('z');
  if (z) {
    try {
      const decoded = decodeURIComponent(z);
      const ref = parseVkVideoRef(decoded);
      if (ref) {
        const u = new URL(VK_VIDEO_EMBED);
        u.searchParams.set('oid', ref.oid);
        u.searchParams.set('id', ref.id);
        u.searchParams.set('autoplay', '1');
        return u.toString();
      }
    } catch {
      /* ignore malformed z */
    }
  }

  const pathRef = parseVkVideoRef(url.pathname);
  if (pathRef) {
    const u = new URL(VK_VIDEO_EMBED);
    u.searchParams.set('oid', pathRef.oid);
    u.searchParams.set('id', pathRef.id);
    u.searchParams.set('autoplay', '1');
    return u.toString();
  }

  return '';
}

function transformDzen(url) {
  const path = url.pathname;
  if (path.startsWith('/embed/')) {
    const u = new URL(url.href);
    Object.entries(DZEN_EMBED_DEFAULTS).forEach(([k, v]) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    });
    return u.toString();
  }
  if (/\/video\/watch\/[^/?#]+/.test(path)) {
    // У Дзена id в /embed/… (короткий ключ) и в /video/watch/… (длинный hex) — разные сущности;
    // собрать корректный embed из watch-ссылки нельзя без кода из модалки «Код публикации».
    // В iframe отдаём саму страницу просмотра (канонический URL без hash).
    return url.href.replace(/#.*$/, '');
  }
  return '';
}

function transformRutube(url) {
  const path = url.pathname.replace(/\/$/, '') || '/';
  const playEmbed = path.match(/^\/play\/embed\/([a-f0-9]+)$/i);
  if (playEmbed) {
    return `https://rutube.ru/play/embed/${playEmbed[1]}/`;
  }
  const video = path.match(/^\/video\/([a-f0-9]+)$/i);
  if (video) {
    return `https://rutube.ru/play/embed/${video[1]}/`;
  }
  return '';
}

function transformLink(raw) {
  if (!raw || !String(raw).trim()) return '';
  const link = normalizeInput(raw);
  let url;
  try {
    url = new URL(link);
  } catch {
    return '';
  }

  const host = hostKey(url.hostname);

  if (
    host === 'vk.com' ||
    host === 'm.vk.com' ||
    host === 'vkvideo.ru' ||
    host === 'm.vkvideo.ru'
  ) {
    return transformVk(url);
  }
  if (host === 'dzen.ru' || host === 'm.dzen.ru' || host === 'zen.yandex.ru') {
    return transformDzen(url);
  }
  if (host === 'rutube.ru') {
    return transformRutube(url);
  }
  if (
    host === 'youtube.com' ||
    host === 'm.youtube.com' ||
    host === 'youtu.be' ||
    host === 'music.youtube.com'
  ) {
    return transformYoutube(link);
  }

  return '';
}
</script>
