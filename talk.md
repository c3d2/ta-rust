% Rust
% hoodie und astro
% 10. Februar 2016


# Part 1 - Die Sprache

---

<!-- vim:set nospell: -->

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
}; // y = i32
```

## Expressions vs Statements

```rust-norun
fn add(a:i32, b:i32) -> i32 {
  a+b
}
```

. . .

```rust
fn main(){
  let x = 2;
  let foo = if x > 1 {"enough"} else {"to few"};
  println!("x = {} -> {:?}", x, foo);
}
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

    Streuselkuchen Windbeutel Nein Danke

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
let foo = match x {
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

# Y U NO parallel?

## Data Races?

* threads greifen auf die selben Daten zu
* unsynchronisiert
* mehrere Schreiben

## Shared nothing

```rust
use std::thread;
use std::sync::mpsc;

fn main(){
  let (tx, rx) = mpsc::channel();
  for task_num in 0..6{
    let tx = tx.clone(); // spezielles clone()
    thread::spawn(
      move || {
        let msg = format!("Task {:?} done!", task_num);
        tx.send(msg).unwrap();
      }
    );
  }

  for data in rx.iter(){
    println!("{:?}", data);
  }
}
```

## Shared *Immutable* State

```rust
use std::sync::Arc;
use std::thread;
use std::sync::mpsc;

struct HugeStruct{
  name: &'static str,
}

fn main(){
  let (tx, rx) = mpsc::channel();
  let huge_struct = HugeStruct{name:"Bruce"};
  let arc = Arc::new(huge_struct);

  for task_num in 0..6{
    let tx = tx.clone();
    let arc = arc.clone(); // increase counter
    thread::spawn(
      move || {
        let msg = format!("Task {:?}?  Accessed {:?}!", task_num, arc.name);
        tx.send(msg).unwrap();
      }
    );
  }

  for data in rx.iter(){
    println!("{:?}", data);
  }
}
```

## Mutation *with* Synchronization

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::sync::mpsc;

struct HugeStruct{
  name: &'static str,
  access_count: u32
}

fn main(){
  let (tx, rx) = mpsc::channel();
  let huge_struct = HugeStruct{name:"Bruce", access_count: 0};
  let arc = Arc::new(Mutex::new(huge_struct));

  for task_num in 0..6{
    let tx = tx.clone();
    let arc = arc.clone(); // increase counter
    thread::spawn(
      move || {
        let mut guard = arc.lock().unwrap();
        guard.access_count +=1;
        let msg = format!("Task {:?}?  Accessed {:?} for the {:?}. time!", task_num, guard.name, guard.access_count);
        tx.send(msg).unwrap();
      }
    );
  }

  for data in rx.iter(){
    println!("{:?}", data);
  }
}

```

## rayon

```rust-norun
let list = vec![1,2,3,4,5,6,7,8,9];
let new_list = list
  .iter()
  .map(|x| do_something_heavy(x))
  .collect();
```

```rust-norun
let list = vec![1,2,3,4,5,6,7,8,9];
let new_list = list
  .par_iter()
  .map(|x| do_something_heavy(x))
  .collect();
```

[rayon](https://github.com/nikomatsakis/rayon/)

## Weitere Libs

* [simple_parallel](https://github.com/huonw/simple_parallel)
* [viel mehr](http://areweconcurrentyet.com/)


## Extra

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

```rust-norun
struct Circle { x: f64, y: f64, radius: f64, }

impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }
}
```

. . .

``` rust-norun
struct Circle { x: f64, y: f64, radius: f64, }

trait HasArea {
    fn area(&self) -> f64;
}

impl HasArea for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }
}
```

## Trait Bounds


```rust-norun
fn print_area<T>(shape: T) {
    println!("This shape has an area of {}", shape.area());
}
```

. . .

```
error: no method named `area` found for type `T` in the current scope
```

. . .

```rust-norun
fn print_area<T: HasArea>(shape: T) {
    println!("This shape has an area of {}", shape.area());
}
```

# eco system

## Links

### News && Community

* [this-week-in-rust.org/](http://this-week-in-rust.org/)
* [/r/rust](http://www.reddit.com/r/rust)
* [users.rust-lang.org](users.rust-lang.org)

### Resources

* [rustbyexample.com/](http://rustbyexample.com/)
* [The Rust Programming Language](http://doc.rust-lang.org/stable/book/)
* [The little book of Rust Macros](https://danielkeep.github.io/tlborm/)
* [Rustonomicon: Dark Arts of unsafe rust](https://doc.rust-lang.org/nightly/nomicon/)

# Part 2 - konkrete Beispiele

---

# Beispiel für Parameterisierte Typen

## Fresh in Hyper

Motivation: HTTP Response Headers können nur geändert werden wenn Body
noch nicht gesendet wird.

```rust-norun
pub trait Handler: Sync + Send {
    fn handle<'a, 'k>(&'a self, Request<'a, 'k>, Response<'a, Fresh>);
    // ...
}

impl<'a> Response<'a, Fresh> {
    fn start(self) -> Result<Response<'a, Streaming>> {
        // ...
    }
}
```

## Pulseaudio-API

* rust-bindgen
* https://crates.io/crates/libpulse-sys

## Pulseaudio-API: Benutzung

```rust-norun
let ss = pa_sample_spec {
    format: PA_SAMPLE_S16LE,
    channels: 1,
    rate: 48000
};
let s = unsafe {
    let name_c = CString::new("Rust!").unwrap();
    let desc_c = CString::new("Example").unwrap();
    pa_simple_new(null(),
                  name_c.as_ptr() as *const i8,
                  PA_STREAM_PLAYBACK,
                  null(),
                  desc_c.as_ptr() as *const i8,
                  &ss,
                  null(),
                  null(),
                  null_mut(),
                 )
};
```
```rust-norun
let res = unsafe {
    pa_simple_write(s, mem::transmute(buf), 2 * SAMPLES, null_mut())
};
```

## Crate pulse-simple

```rust-norun
const RATE: u32 = 48000;
let p = Playback::new("Example", "Playback", RATE);

// Generate 1s of sound
let mut data = Vec::with_capacity(RATE as usize);
for i in 0..RATE {
    let t = i as f64 / RATE as f64;
    let make_freq = |f: f64| ((std::i16::MAX as f64) * (f * 2.0 * PI * t).sin()) as i16;
    data.push([make_freq(440.0), make_freq(330.0)]);
}

// Play in a loop
loop {
    p.write(&data[..]);
}
```

## Crate pulse-simple: Playback

```rust-norun
pub struct Playback<C: ChannelCount> {
    client: SimpleClient<C>
}

impl<C: ChannelCount> Playback<C> {
    pub fn new(name: &str, desc: &str, rate: u32) -> Self {
        Playback {
            client: SimpleClient::new(name, desc, PA_STREAM_PLAYBACK, rate)
        }
    }

    pub fn write(&self, data: &[C]) {
        let res = unsafe {
            let ptr = transmute(data.as_ptr());
            pa_simple_write(self.client.simple, ptr, data.len() * C::sample_size(), null_mut())
        };
        assert!(res == 0);
    }
}
```

## Crate pulse-simple: SimpleClient

```rust-norun
struct SimpleClient<C: ChannelCount> {
    simple: *mut pa_simple,
    phantom: PhantomData<C>,
}

impl<C: ChannelCount> SimpleClient<C> {
    fn new(name: &str, desc: &str, dir: pa_stream_direction_t, rate: u32) -> Self {
        let ss = pa_sample_spec {
            format: C::format(),
            channels: C::count(),
            rate: rate
        };
        let name_c = CString::new(name).unwrap();
        let desc_c = CString::new(desc).unwrap();
        let s = unsafe {
            pa_simple_new(null(), name_c.as_ptr() as *const i8,
                          dir, null(),
                          desc_c.as_ptr() as *const i8, &ss,
                          null(), null(), null_mut()
                         )
        };
        assert!(s != null_mut());
        SimpleClient {
            simple: s,
            phantom: PhantomData
        }
    }
}
```

## Crate pulse-simple: ChannelCount

```rust-norun
pub trait ChannelCount {
    fn count() -> u8;

    type S: Sampleable;
    fn format() -> pa_sample_format_t {
        Self::S::format()
    }
    fn sample_size() -> usize {
        Self::count() as usize * size_of::<Self::S>()
    }
}
```
