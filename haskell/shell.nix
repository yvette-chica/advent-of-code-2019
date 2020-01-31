with import <nixpkgs> {};

stdenv.mkDerivation rec {
  name = "some_env";
  buildInputs = [ pkgs.ghc pkgs.haskellPackages.ghcid ];
}

