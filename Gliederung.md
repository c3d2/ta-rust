% Rust Themenabend
% astro und hoodie
% January 11, 2016

# Was ist Rust?

## existiert seit

* developed @mozilla since ~2007
* stable since May 2015

## Rust powers:

* Servo *(super cool fast browser engine)*
* machine learning tools ( [leaf](https://github.com/autumnai/leaf), [rustlearn](https://github.com/maciejkula/rustlearn))
* safe parsers ([nom](https://github.com/Geal/nom))
* [seL4 stack](https://robigalia.org/)
* Maidsafe
* everything else

# Vergleiche

## Rust ist wie ...

* ... c++
* ... haskell
* ... ruby
* ... python

## wie c++

* statisch kompiliert ( LLVM )
* scheiße schnell
* zero cost abstractions
* generic
* kein garbage-collector
* **low level**

## wie haskell

* streng getypt
* Hindley-Milner type system
* immutable variables
* pattern matching
* λ-ausdrücke/closures

## wie ruby oder python

* expressive Syntax
* gut zu lesen
* build system und Packetmanager (cargo & crates.io)

## wie rust!

* **borrow checker**

---

## Einflüße

* **SML, OCaml:** algebraic data types, pattern matching, type inference, semicolon statement separation
* **C++:** references, RAII, smart pointers, move semantics, monomorphization, memory model
* **ML Kit, Cyclone:** region based memory management
* **Haskell (GHC):** typeclasses, type families
* **Newsqueak, Alef, Limbo:** channels, concurrency
* **Erlang:** message passing, thread failure

## Einflüße 2
* **Swift:** optional bindings
* **Scheme:** hygienic macros
* **C#:** attributes
* **Unicode Annex #31:** identifier and pattern syntax

siehe: [influence](http://doc.rust-lang.org/reference.html#appendix-influences)

# Features

## Sicherheit

* guaranteed memory safety
* threads without data races

* move semantics
* Type inference
* Typsicherheit zur compile time -> no implicit coercions/casting

## Leistung

* zero-cost abstractions
* minimal runtime
* efficient C bindings

## Sprache

* trait-based generics
* pattern matching
* hygienische macros
* expressions und statements
* closures
* Beispiele folgen

## Ökosystem

* Dokumentation ist TopPriority
* in-line Tests und Benchmarks (`#[test]` und `#[bench]`)
* cargo kompiliert, dokumentiert, testet, benchmarkt und publisht

# Details

## Memory Model

* kein GarbageCollector
* keine manuelle Speicherverwaltung
* **borrow checker** forciert Ownership and Move Semantics
* Destruktor: `trait Drop`

## Wie jetzt?

* a reference to a resource is "borrowed"
* only one party can mutate resources
* Move Semantics are implicitly part of the language
* there is one concrete owner to everything
* racing code would not even compile

# here be dragons

## der rest ist unsortiert

* Traits vs Object Orientation -> composition vs inheritance
* Trait based Generics vs Templates -> no ducktyping in "template" expansions
* no nullpointers => functions return `Option<T>` or `Result<T>`
* functional style Error Handling, no exceptions :)

## Concurrency

* mpsc channels
* ownership is enforced -> no Dataraces
* shared access through `Arc`

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let data = Arc::new(
        Mutex::new(
            vec![1, 2, 3]
            )
        );

    for i in 0..3 {
        let data = data.clone();
        thread::spawn(move || {
            let mut data = data.lock().unwrap();
            data[i] += 1;
        });
    }

    thread::sleep_ms(50);
}
```

## Macros

* very unlike C/C++ Macros
* work on AST after parser
* **example**


# HandsOn: Life Coding Examples

## Basics

#. (im)mutability
#. primitives and tuple, enum, struct
#. control flow (if, loop, while)
#. expressions vs statements
#. println!()

## Get Rusty

#. references (e.g. String vs &str)
#. Option and Result
#. pattern matching (match, if let)
#. error handling, simple

## Stdlib

#. collections
#. iterators

## Advanced

#. closures
#. traits, trait bounds
#. documentation comments, in-line tests `#[test]` and benchmarks `#[bench]`
#. error handling, closer look

## For Completeness Sake

#. modules
#. macros ( please don't )

# Extension Slides

##

# alternatives to Rust?

## Go

 * (+) compiles faster than rust
 * (+) statically compiled and linked
 * (-) strange design decisions
 * (-) nothing groundbreaking
 * (-) garbage collected
 * (-) completely separate toolchain
 *  -> more competition to java

## C++17 + GSL

  * (+) fits in existing codebase
  * (-) reiteration of codebase necessary
  * (-) large language, old style still possible
  * (-) language makes static compile time checks nontrivial

## Haskell

  * (+) safe
  * (-) not intended for systems programming

## Swift

  * no garbage collection, by reference counting
  * `Optional` is similar to `Option<T>`, but equivalent to `Result<T>` is 3rd party

## disadvantages of Rust

* price of safety: may slightly reduce performance
* bigger bins
* ABI compatible with C but not with C++, requires wrappers or `extern c`
* static linking by default
* builds against glibc, musl (experimental), uclibc (not tested)


<!--
# Community and Documentation

## Community and Documentation

* users.rust-lang.org
* http://rustbyexample.com/
* http://doc.rust-lang.org/stable/book/
* http://www.reddit.com/r/rust
* http://rustyrad.io/
* http://this-week-in-rust.org/
* http://cglab.ca/~abeinges/blah/turpl/_book/

# eco system
* cargo as package manager and build system
* crates.io as repo, extern git repositories, explizite

-->

# Cargo

* Gleich benutzen
* Macht den Umgang mit external crates möglich

## Wohin mit dem Code?

* Libraries: `src/**/lib.rs`
* Binaries: `src/main.rs src/bin/*.rs`

## Cargo.toml




ownership/borrowing: use-case cache

struct Cache {
    cached: Option<i32>;
}

impl Cache {
    pub fn get(&mut self) -> &i32 {
        match self.cached {
            Some(ref cached) => cached;
            None => {
                self.cached = 32;
                &self.cached
            }
        }
    }
}

Typing-Beispiele: Fresh in Hyper, pulse-simple
