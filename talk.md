% Rust
% astro und hoodie
% February 10, 2016

# Was ist Rust?

## eine Programmiersprache!

* entwickelt von Mozilla, seit 2007
* stabil seit Mai 2015

## Beispiele:

* Servo *(super cool fast browser engine)*
* machine learning tools ([leaf](https://github.com/autumnai/leaf), [rustlearn](https://github.com/maciejkula/rustlearn))
* rustc selbst
* safe parsers ([nom](https://github.com/Geal/nom))
* [seL4 stack](https://robigalia.org/)
* Maidsafe

# Vergleiche

## Rust ist wie ...

* ... c/c++
* ... haskell
* ... ruby
* ... python

. . .

und doch ganz anders

## wie c/c++

* statisch kompiliert *LLVM*
* schnell
* kein garbage-collector
* Generics
* zero cost abstractions
* **low level**

## wie haskell

* streng getypt
* Hindley-Milner type system
* Immutable Variablen
* Pattern Matching
* lambda-Ausdrücke/Closures

## wie ruby oder python

* expressive Syntax
* gut zu lesen
* Build system und Packetmanager (cargo & crates.io)

## wie rust eben!

* **borrow checker**
* lifetimes Syntax
* sehr explizit



## Einflüße

* **SML, OCaml:** algebraic data types, pattern matching, type inference, semicolon statement separation
* **C++:** references, RAII, smart pointers, move semantics, monomorphization, memory model
* **ML Kit, Cyclone:** region based memory management
* **Haskell (GHC):** typeclasses, type families
* **Newsqueak, Alef, Limbo:** channels, concurrency

## Einflüße

* **Erlang:** message passing, thread failure
* **Swift:** optional bindings
* **Scheme:** hygienic macros
* **C#:** attributes
* **Unicode Annex #31:** identifier and pattern syntax

siehe: [influences](http://doc.rust-lang.org/reference.html#appendix-influences)

# Features

## Sicherheit

* Speichersicherheit
* Cuncurrency ohne Speicherverletzungen

* *move semantics*
* Type inference
* Typsicherheit zur Compilezeit
  * keine implizites casting

## Leistung

* [zero-cost abstractions](http://blog.rust-lang.org/2015/05/11/traits.html)
* minimale Runtime
* effiziente C Bindings

## Sprache

* trait-based generics
* pattern matching
* hygienische macros
* expressions und statements
* closures
* Beispiele folgen

## Ökosystem

* Dokumentation ist TopPriority
* in-line Tests und Benchmarks
    * `#[test]`
    * `#[bench]`

* cargo kompiliert, dokumentiert, testet, benchmarkt und publisht

## Cargo

* cargo as package manager and build system
* crates.io as repo, extern git repositories, explizite
* Gleich benutzen
* Macht den Umgang mit external crates möglich

## Wohin mit dem Code?

* Libraries: `src/**/lib.rs`
* Binaries: `src/main.rs src/bin/*.rs`


# Beispiele

## Hello world

```rust
fn main(){
  println!("hello world");
}
```

. . .

Vorsicht, Macro!

## Formatted Print

```rust
fn main() {

    println!("{} entspricht {:b} ", 42, 42);

    println!("{0}, this is {1}. {1}, this is {0}", "Alice", "Bob");

    // As can named arguments.
    println!("Themenabend   \"{subject}\"", subject="Rust",);

    // Alignment
    println!("{number:>width$}", number=1, width=6);
    println!("{number:>0width$}", number=1, width=6);

}
```

## Debug Print

```rust
fn main(){

    #[derive(Debug)]
    struct Themenabend{
      number: i32,
      title: &'static str,
    };

    println!("Interne Struktur von {:?}",
    Themenabend{
      number:3,
      title:"Rust Themenabend"
    });
}
```

# Datentypen

## Vectors

```rust
fn main() {
let _list = vec![1,2,3,4];

// entspricht

let _list2 = {
  let mut list = Vec::new();
  list.push(1);
  list.push(2);
  //...
  list
};

let _range: Vec<i32> = (0..10).collect();
}
```

## Options
```rust-norun
pub enum Option<T> {
    Some(T),
    None
}
```

. . . 

```rust
fn divide(a:i32, b:i32) -> Option<i32>{
  if b == 0 {
    None
  } else { Some(a/b) }
}

fn main(){
  println!("12/3 = {:?}", divide(12,3));
  println!("12/0 = {:?}", divide(12,0));
}
```

## Primitive

```rust-norun
fn main(){
  let one = 1u32;
  let fourtytwo= 0b101010;
  let goku = 9_001;
  let ladies = ("x","y");
}
```

## Pointers

```rust-norun
fn main(){
  let sushi = Box::new(("rice", "fish"));
}
```

# Sicher, schnell, wie?

## Memory Model

* kein GarbageCollector
* keine manuelle Speicherverwaltung
* **borrow checker** forciert Ownership and Move Semantics
* Destruktor: `trait Drop`

## Move Semantics 1

```rust
fn main(){
  let list = vec![1,2,3];
  let x = list;
  let y = list; // Compiletime Error: use after move
}
```

## Move Semantics 2

```rust
fn do_some(_foo:Vec<i32>){
    // konsumiert `foo`
}

fn main(){
  let list = vec![1,2,3];
  println!("{}", list[0]);
  do_some(list);
  println!("{}", list[0]); // fails
}
```

## Sharing is Caring 1


```rust
fn main(){
  let list = vec![1,2,3];
  let x = &list;
  let y = list; // Compiletime Error: use while borrowed
}
```

. . .

Warum also?
Borrowing gilt nur innerhalb von Scopes!


## Sharing is Caring 2

```rust
fn main(){
  let list = vec![1,2,3];
  {
    let _x = &list;
  }
  let _y = list;
}
```

## Borrowing

```rust
fn do_some(_foo:&Vec<i32>){
}

fn main(){
  let list = vec![1,2,3];
  println!("{}", list[0]);

  do_some(&list);          // explitzite Referenz, unlike C++
  println!("{}", list[0]); // fails no more
}
```

## References at a glance

Syntax    Funktion
------    --------
`T`       Basistyp
`mut T`   veränderlicher Typ
`&T`      read-only Referenz *niemand kann schreiben*
`&mut T`  schreibbare Referenze *nur einer kann schreiben*

```rust-norun
let v:Vec<i32> = vec![1,2,3,4];
let v_ref:&Vec<i32> = &v;
```

```rust-norun
let mut v:Vec<i32> = vec![1,2,3,4];
let v_ref:&mut Vec<i32> = &mut v;
```

## Usecases

. . .

```rust-norun
fn read(v: &Vec<String>) -> String {
    let first: &String = &v[0]; // borrow ref to first elem
    println!("v[0]: {}", first);
    first.clone()
}
```

. . .

```rust-norun
fn modify(v: &mut Vec<String>, name: &str) {
    let freshly_created = format!("Hello {}", name);
    v.push(freshly_created);
}
```

. . .

```rust-norun
fn consume(v: Vec<String>) -> String {
    for s in v { return s; }
    panic!("v was empty?!?");
}
```

. . .

```rust-norun
fn read(v: &Vec<String>) -> String { ... }
fn modify(v: &mut Vec<String>, name: &str) { ... }
fn consume(v: Vec<String>) -> String { ... }
```

# Control Flow

## what if?

```rust-norun
let x = 5;
if x == 5 {
    println!("x is five!");
} else if x == 6 {
    println!("x is six!");
} else {
    println!("x is not five or six :(");
}
```

. . .

```rust-norun
let y = if x == 5 {
    10
} else {
    15
}; // y: i32
```

## Switch cases?

```cpp
int main(){
    int auswahl;

    cout << "Wählen Sie Ihre Lieblingsleckerei:\n"
            "1 - Käsesahnetorte\n"
            "2 - Streuselkuchen\n"
            "3 - Windbeutel\n";

    cin >> auswahl;

    switch(auswahl){
        case 1:  cout << "Käsesahnetorte!";
        case 2:  cout << "Streuselkuchen";
        case 3:  cout << "Windbeutel";
        default: cout << "Nein Danke";
    }
}
```

. . .

```
Streuselkuchen Windbeutel Nein Danke
```

## Matching

```rust-norun
let auswahl = 2;
match auswahl {
		1 => println!("Käsesahnetorte!"),
		2 => println!("Streuselkuchen"),
		3 => println!("Windbeutel"),
		_ => println!("Nein Danke")
}
```

```rust-norun
match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

```rust-norun
let origin = Point { x: 0, y: 0 };
match origin {
    Point { y, .. } => println!("y is {}", y),
}
```

```rust-norun
match 'f' {
    'a' ... 'j' => println!("early letter"),
    'k' ... 'z' => println!("late letter"),
    _ => println!("something else"),
}
```

## loops

```rust-norun
loop {
    println!("Loop forever!");
}
```

. . .

```rust-norun
while !done {
    x += x - 3;

    println!("{}", x);

    if x % 5 == 0 { done = true; }
}

```


# OOP ?

## struct und enum


```rust-norun
struct Point { x: i32, y: i32 }
```

. . .

```rust-norun
enum Message {
    Quit,
    ChangeColor(i32, i32, i32),
    Move { x: i32, y: i32 },
    Write(String),
}
```


## Impl

```rust-norun
struct Point { x: i32, y: i32 }

impl Point {
    fn distance_from_origin(&self) -> i32 {
        let Point { x, y } = *self;
        let sum = (x*x + y*y) as f64;
        sum.sqrt() as i32
    }
}
```

. . .

 * `self` : Kurz für `self:Self`, konsumiert
 * `&self` : Read-only
 * `&mut self` : Read-Write

## Drop

```rust-norun
struct Point { x: i32, y: i32 }

impl Point {
    fn Drop(self) {
    }
}
```

## Traits

-------------------------------------

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

# eco system


## Community and Documentation

* users.rust-lang.org
* http://rustbyexample.com/
* http://doc.rust-lang.org/stable/book/
* http://www.reddit.com/r/rust
* http://rustyrad.io/
* http://this-week-in-rust.org/
* http://cglab.ca/~abeinges/blah/turpl/_book/



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
