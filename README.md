<p align="center">
    <img src="assets/logo.png" height="128"/>
    <h1 align="center">FlipSnap by HiKs</h1>
    <p align="center">
    Two Sides, One Post. Share the Moment Behind the Moment.
    </p>
</p>

# Introduction
Welcome to FlipSnap, the photo-sharing social networking service that redefines how we share moments. FlipSnap allows users to post photos in pairs, each with a public side and a private side. While the public side is open for everyone to view, the private side requires mutual following, ensuring a more intimate sharing experience with friends and family. This unique approach allows users to enjoy the benefits of both public sharing and private communication in a single post, creating a new and exciting way to connect and share memories.

パブリック性とクローズド性を兼ね備えた写真共有SNS。写真は表/裏の2枚1組で投稿し，表は誰でも閲覧可能だが，裏は相互フォローでないと閲覧できない。表ではオープンに発信しつつも、裏ではプライベートな共有ができる。1つの投稿で公開性と閉鎖性を両立させ，新たな体験価値を創出する。

> Learn More : [About FlipSnap(Legacy) - Google Slides](https://docs.google.com/presentation/d/1nT-R3LLSaJre9aVunzU5bDOaMUMVbk9CG3p1ibkhiO8/edit?usp=sharing) </br>
> ※ Note that the slide is created when the project was in its early stage (Legacy Version). It may not reflect the current state of the project.

# ScreenShots
![Screenshot](assets/Screenshot.jpg)

# Tech Stack
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/k7oya14/flipsnap)</br>
フロントエンドはNext.jsベースでtailwindcssやFramerMotionなどで構築，
バックエンドはNode.jsベースでPrisma+Postgres, Redisなどで構築している。

- **Frontend:** Next.js, tailwindcss, shadcn/ui, FramerMotion
- **Backend:** Node.js, Hono.js, Zod, Prisma, NextAuth
- **Infra:** Vercel, Cloudflare Workers, Fly.io, Docker
- **DB:** supabase, Upstash Redis
- **CI/CD:** Github Actions

[Detailed Report](./techstack.md)

## Architecture
![Twitter Architecture](assets/Twitter-architecture.png)
Twitterのシステムを参考にし，フォローしているユーザーがPostしたら各ユーザーのタイムラインにキャッシュするPUSHベースのアーキテクチャを採用。その（サーバーサイド）キャッシュには，RedisのCache prefetchingを用いてFan-out Applicationを実装している。
![redis Cache prefetching](assets/redis-CachePrefetching.jpg)

# Authors
A list of the original co-authors.
- [team HiKs](https://github.com/team-hiks)
    - 坂　功弥 (Koya Saka) - Backend - [@k7oya14](https://github.com/k7oya14)
    - 石渡　輝(Hikaru Ishiwata) - Frontend - [@hishiwat](https://github.com/hishiwat)

# History
This repo supersedes the legacy version, [FlipSnap (Legacy)](https://github.com/k7oya14/flipsnap-legacy).
