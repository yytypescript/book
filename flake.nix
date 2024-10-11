{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            (final: prev: {
              # このワークスペースで使うNode.jsのバージョンの指定
              nodejs = prev.nodejs_20;

              # NPMパッケージの実行形式が使うNode.jsのバージョンを上と同一にする設定
              buildNpmPackage = prev.buildNpmPackage.override {
                nodejs = final.nodejs;
              };
            })
          ];
        };

        # 開発で使用するツールの宣言
        tools = with pkgs; [
          nodejs
          yarn-berry
        ];
      in
      {
        # IDEへの対応
        # `nix profile install` で ~/.nix-profile/bin にインストールされるため、/workspace 外でもツールを利用できるようになります。
        # これは、VS CodeやJetBrains IDEなどのプロセスが、/workspace外で起動することに対応することができます。
        defaultPackage = pkgs.symlinkJoin {
          name = "workspace-tools";
          paths = tools;
          # symlinkJoinはnodePackagesで導入される実行形式にリンクを貼れないため、その手当となる設定
          postBuild = ''
            for f in $out/lib/node_modules/.bin/*; do
                path="$(readlink --canonicalize-missing "$f")"
                ln -s "$path" "$out/bin/$(basename $f)"
            done
          '';
        };

        # `nix develop` への対応。
        devShells.default = pkgs.mkShell {
          buildInputs = tools;
          shellHook = ''
            if [ -n "$SHELL" ]; then
              exec $SHELL
            else
              echo "SHELL environment variable is not set. Using default shell."
            fi
          '';
        };

        formatter = pkgs.nixpkgs-fmt;
      }
    );
}
