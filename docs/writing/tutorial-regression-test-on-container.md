---
description: Dockerコンテナでチュートリアル(docs/tutorials)の回帰テストを行う手順をまとめます。
sidebar_label: チュートリアル回帰テスト(コンテナ)
---

# Dockerコンテナでチュートリアルの回帰テストを行う

チュートリアルの回帰テストを AI エージェントに実行させるための **Ubuntu ベース環境**です。

- **OS**: Ubuntu
- **shell**: `zsh`（`developer`ユーザーのデフォルト）
- **user**: `developer`（sudoer / passwordless）
- **homebrew-linux**: 導入済み（`developer`が `brew` を利用可能）
- **WORKDIR**: `/home/developer`
- **port**: `3000`（Next.js 等の起動用）

## 使い方

### 起動（docker compose）

`regression-test/` ディレクトリで実行します（Dockerfile がこのディレクトリにあります）。

```bash
cd regression-test
docker compose up -d --build
```

この compose は次をコンテナにマウントします。

- `../docs` → `/home/developer/regression-test/docs`（read-only）
- `../static` → `/home/developer/regression-test/static`（read-only）
- `../.cursor` → `/home/developer/regression-test/.cursor`（read-only）
- `./workspace` → `/home/developer/regression-test/workspace`（read-write）
- `./issues` → `/home/developer/regression-test/issues`（read-write）

### Cursor で開く（推奨）

1. `command + P`
2. `Dev Containers: Attach to Running Container`
3. `regression-test-env-1` を選択して開く
4. `Open Folder` で `/home/developer/regression-test` を開く
5. Cursor のチャットで `/tutorial-regression-test` を実行し、回帰テスト対象のチュートリアル Markdown を指定する（例: `docs/tutorials/nextjs.md`）

問題点は `issues/<チュートリアルファイル名>.md` に出力されます（例: `issues/nextjs.md`）。このディレクトリはホストの `regression-test/issues/` に永続化されます。

### コンテナに入る（zsh）

```bash
docker compose exec env zsh
```

コンテナ内で以下が通ればOKです。

```bash
whoami
brew --version
node --version
npm --version
```

## 終了/掃除

```bash
docker compose down
```
