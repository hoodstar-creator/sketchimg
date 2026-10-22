# Caricature QR

운영자가 사진 한 장을 업로드하면 손님 전용 QR코드를 생성하는 최소형 웹 앱입니다.

## 저장 구조

- 사진: Vercel Private Blob의 `photos/{token}.webp`
- QR 주소: `/p/{token}`
- 별도 SQL 데이터베이스 없음
- QR 이미지는 브라우저에서 생성하며 저장하지 않음

## 로컬 실행

1. `.env.example`을 `.env.local`로 복사합니다.
2. `ADMIN_PASSWORD`에 8자 이상의 운영자 비밀번호를 설정합니다.
3. Vercel Private Blob의 `BLOB_READ_WRITE_TOKEN`을 설정합니다.
4. `pnpm install` 후 `pnpm dev`를 실행합니다.

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 푸시합니다.
2. Vercel에서 해당 저장소를 Import합니다.
3. 프로젝트의 Storage에서 Private Blob 저장소를 생성하고 연결합니다.
4. Environment Variables에 `ADMIN_PASSWORD`를 추가합니다.
5. 다시 배포합니다.

Vercel에서 연결한 Blob 저장소의 인증 정보는 프로젝트 환경변수로 자동 제공됩니다.
