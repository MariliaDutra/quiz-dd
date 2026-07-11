# Carteirinha Digital

App de carteirinha/crachá pessoal (nome, curso, ID, QR code, foto) com painel de administração para editar os dados. Construído em React + Vite, empacotado como app Android com Capacitor.

## Rodando localmente

```bash
npm install
npm run dev
```

## Gerando o APK

O APK é gerado automaticamente pelo GitHub Actions (`.github/workflows/build-apk.yml`) a cada push — baixe o artefato `app-debug` na aba **Actions** do repositório.

Para gerar localmente (requer Android SDK instalado):

```bash
npm install
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
# APK em android/app/build/outputs/apk/debug/app-debug.apk
```
