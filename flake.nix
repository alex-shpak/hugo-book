{
  description = "CDI Grimoire - the club's docs site";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAll = f: nixpkgs.lib.genAttrs systems (s: f nixpkgs.legacyPackages.${s});
    in
    {
      # nix develop  ->  a shell with the exact hugo everyone else is using
      devShells = forAll (pkgs: {
        default = pkgs.mkShell {
          packages = [ pkgs.hugo pkgs.git ];
          shellHook = ''
            echo "grimoire: $(hugo version | cut -d'+' -f1)"
            echo "run 'hugo server' and open http://localhost:1313/grimoire/"
          '';
        };
      });

      # nix run  ->  live preview without even entering the shell
      apps = forAll (pkgs: {
        default = {
          type = "app";
          meta.description = "Serve the docs locally with live reload";
          program = toString (pkgs.writeShellScript "grimoire-serve" ''
            exec ${pkgs.hugo}/bin/hugo server --minify "$@"
          '');
        };
      });
    };
}
