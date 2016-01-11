% Rust Themenabend
% astro und hoodie
% January 11, 2016

# Introduction

## example
```rust
#[allow(dead_code)]
enum Coffee {
	Hot(u8), 		// test
	Iced(bool), // still has ice
	Instant
}

fn main(){
	let foo = "bar";
	println!("this was printed in rust")
}
```

## History

* originally conceived by Graydon Hoare *(nicht Charles Antony Richard Hoare)*

## Development

* Lang by Mozilla Re, used in next-gen browser-engine *Servo*
* developed since ~2007
* uses LLVM toolchain
* type system based on Hindley-Milner type system (similar to Haskell)
* stdlib intended for concurrent and memory safety (`Arc`, `Mutex`)
* stdlib and syntax fixed since May 2015

## Cool Stuff

* pattern matching
* expressions vs statements
* closures
* macros
* documentation comments
* in-line tests `#[test]` and benchmarks `#[bench]`

# Original Advertisement

## foo

* [website arguments](https://rust-lang.org)
* zero-cost abstractions
* move semantics
* guaranteed memory safety
* threads without data races
* trait-based generics
* pattern matching
* type inference
* minimal runtime
* efficient C bindings

## [influence](http://doc.rust-lang.org/reference.html#appendix-influences)

* **SML, OCaml:** algebraic data types, pattern matching, type inference, semicolon statement separation
* **C++:** references, RAII, smart pointers, move semantics, monomorphization, memory model
* **ML Kit, Cyclone:** region based memory management
* **Haskell (GHC):** typeclasses, type families
* **Newsqueak, Alef, Limbo:** channels, concurrency
* **Erlang:** message passing, thread failure
* **Swift:** optional bindings
* **Scheme:** hygienic macros
* **C#:** attributes
* **Unicode Annex #31:** identifier and pattern syntax


# details

## [advantages to c++](http://graydon.livejournal.com/220853.html)

## What Rust shipped without

*  null pointers
*  array overruns
*  data races
*  wild pointers
*  uninitialized, yet addressable memory
*  unions that allow access to the wrong field

## Less-well-known things I'm very proud that rust shipped 1.0 without:

* a shared root namespace
* variables with runtime "before main" static initialization (the .ctors section)
* a compilation model that relies on textual inclusion (#include) or textual elision (</tt>#ifdef</tt>)
* a compilation model that relies on the order of declarations (possible caveat: macros)
* accidental identifier capture in macros
* random-access strings
* UTF-16 or UCS-2 support anywhere outside windows API compatibility routines
* signed character types
* (hah! vertical tab escapes (as recently discussed) along with the escapes for bell and form-feed)
* "accidental octal" from leading zeroes
* goto (not even as a reserved word)
* dangling else (or misgrouped control structure bodies of any sort)
* case fallthrough
* a == operator you can easily typo as = and still compile
* a === operator, or any set of easily-confused equality operators
* silent coercions between boolean and anything else
* silent coercions between enums and integers
* silent arithmetic coercions, promotions
* implementation-dependent sign for the result of % with negative dividend
* bitwise operators with lower precedence than comparison operators
* auto-increment operators
* a poor-quality default hash function
* pointer-heavy default containers



## Memory Model

* no garbage collection, low level access possible
* variables immutable by default
* real innovation: **borrow checker** -> enforces Ownership and Move Semantics
* a reference to a resource is "borrowed"
* only one party can mutate resources
* Move Semantics are implicitly part of the language
* there is one concrete owner to everything
* racing code would not even compile

## Type System

* Type safety at compile time -> no implicit coercions/casting

```rust
/// Example of Enums and Structs here
```

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
