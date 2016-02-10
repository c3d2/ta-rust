% Themenabend
% hoodie und astro
% 10. Februar 2016
 
<img src="../rust-logo-wht.svg" width="75%" />

# Part 1 - Die Sprache

# Was ist Rust?

## eine Programmiersprache!

* entwickelt von Mozilla, seit 2007
* stabil seit Mai 2015

<img src="../hello.svg" width="40%" />

## Was ist in Rust?

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
* Generics, besser
* zero cost abstractions
* **low level**

## wie go

* jung
* effizient
* googlebar

## wie haskell

* Typesystem
* Immutable Variablen
* Pattern Matching

## wie ruby oder python

* expressive Syntax
* gut zu lesen
* Build system und Packetmanager (cargo & crates.io)
* `Self`stVerständnis
* lambda-Ausdrücke/Closures

## wie rust eben!

* **borrow checker**
* lifetimes Syntax
* sehr explizit: no overloading, no default parameters, no exceptions

<img src="../jump.svg" width="40%" />

## Einflüsse

* **SML, OCaml:** algebraic data types, pattern matching, type inference, semicolon statement separation
* **C++:** references, RAII, smart pointers, move semantics, monomorphization, memory model
* **ML Kit, Cyclone:** region based memory management
* **Haskell (GHC):** typeclasses, type families
* **Newsqueak, Alef, Limbo:** channels, concurrency

## Einflüsse

* **Erlang:** message passing, thread failure
* **Swift:** optional bindings
* **Scheme:** hygienic macros
* **C#:** attributes
* **Unicode Annex #31:** identifier and pattern syntax

siehe: [influences](http://doc.rust-lang.org/reference.html#appendix-influences)

# Features

## Achtung, Werbung

<img src="../shy.svg" width="40%" />

## Sicherheit

* Cuncurrency ohne Racesconditions
* *move semantics*
* Type inference
* Typsicherheit zur Compilezeit
  * kein implizites Casting

## Leistung

* zero-cost abstractions durch [traits](http://blog.rust-lang.org/2015/05/11/traits.html)
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
    * cargo doc beats doxygen
    * special comments
    * inline examples with testing
    * community doc is awesome

* in-line Tests und Benchmarks
    * `#[test]`
    * `#[bench]`

## Cargo

* cargo as package manager and build system
* crates.io as repo, extern git repositories, explizite
* Gleich benutzen
* Macht den Umgang mit external crates möglich
* cargo `build`, `run`, `doc`, `test`, `bench`, `publish`

. . .

```
$ git clone https://github.com/astro/rust-kenburns/
$ cd rust-kenburns
$ cargo run
```

. . .

```
$ git clone https://github.com/hoodie/rust-chess
$ cd rust-chess
$ cargo run --example random_player
```

## Wohin mit dem Code?

* Libraries: `src/lib.rs`
* Binaries: `src/main.rs`

. . .

### oder

* Libraries: `src/**/lib.rs`
* Binaries: `src/bin/*.rs`

## Wie teste ich meine lib?

. . .

### LIFE

# Beispiele

## Hello world

```rust
fn main(){
  println!("hello world");
}
```

<img src="../hello.svg" width="40%" />

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

* `std::fmt::Display` für `"{}"`
* `std::fmt::Debug` für `"{:?}"`

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

## Primitive

```rust-norun
  let goku:u64 = 9001;     // expliziter Typ
  let goku = 9_001;        // impliziter Typ
  let goku = 9_001u64;     // suffix Form

  let fourtytwo= 0b101010; // Binäre Form
  let ladies = ("x",'y');  //Tuple, `&str` und `char`
```

## Arrays

```rust-norun
// hat konstante Länge
let four_byte:[u8; 4] = [1, 2, 3, 4];
let four_byte = [0; 4]; // -> [0,0,0,0]
```

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

## Slices

```rust
fn fill(slice: &mut [i32], c: i32) {
  for s in slice.iter_mut() {
    *s = c;
  }
}

fn main() {
  let mut list = vec![1,2,3,4];
  fill(&mut list[1..3], 23);
  println!("List: {:?}", list);
}
```

Analog: `&str` für `String`

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

## Strings

```rust-norun
let string_slice:&str   = "hello world";
let owned_string:String = string_slice.to_string();

fn say_some(message:&str){
  println!("{:?}", message);
}

say_some(&owned_string);
```

. . .

```rust-norun
let owned_string:String = string_slice.to_owned();
let owned_string:String = string_slice.into();
let owned_string:String = String::from(string_slice);
```

## lifetimes

```rust-norun
// implicit
fn foo(x: &i32) {
}

// explicit
fn bar<'a>(x: &'a i32) {
}
```

[RTFM](http://doc.rust-lang.org/stable/book/lifetimes.html)

## Pointers

```rust-norun
fn main(){
  let sushi = Box::new(("rice", "fish")); // like unique pointer
}
```

## Stop already!!!

Es gibt ein tolles [Buch](http://doc.rust-lang.org/stable/book/), sogar auf [deutsch](https://github.com/panicbit/rustbook-de).\
Dieser Vortrag wird sonst zu lang!

# Do you have OOP?

## pepsi ok?

---

## basics

### structs


```rust-norun
struct Love;                    // unit struct
struct Point ( i32, i32 );      // tuple struct
struct Point { x: i32, y: i32 } // as you know from C
```

### enums

```rust-norun
enum Message {
    Quit,
    ChangeColor(i32, i32, i32),
    Move { x: i32, y: i32 },
    Write(String),
}
```

[more](http://doc.rust-lang.org/stable/book/structs.html)
[more](http://doc.rust-lang.org/stable/book/structs.html)


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

geht auch für enum!

## Constructor?

. . .

```rust
struct Point { x: i32, y: i32, z:i32}

impl Point {
    fn new() -> Point {
      Point { x: 0, y: 0, z:0}
    }

    fn on_plane(x:i32, y:i32) -> Self {
      Point { x: x, y: y, ..Point::new()) }
    }
}
```

* [trait Copy](http://doc.rust-lang.org/stable/std/marker/trait.Copy.html)
* [clone()](http://doc.rust-lang.org/stable/std/clone/trait.Clone.html#tymethod.clone)
* [std::convert](http://doc.rust-lang.org/stable/std/convert/)


## self? so wie in python?

 * `self` : Kurz für `self:Self`, konsumiert
 * `&self` : Read-only
 * `&mut self` : Read-Write
 * mehr später

<img src="../happy.svg" width="50%" style="float:right" />

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


## Drop

```rust-norun
struct Point { x: i32, y: i32}

impl Point {
    fn Drop(self) {
    }
}
```

<img src="../hang.svg" width="75%" style="float:right" />

## Drop (more)

```rust-norun
struct Point { x: i32, y: i32, internal: *mut () }

impl Point {
    fn Drop(self) {
        free_void_pointer(self.internal);
    }
}
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

## for loops

```rust-norun
for x in 0..10 {
    println!("{}", x); // x: i32
}
```

```rust
fn main(){
  let list = vec!["dog", "cat", "mouse", "cheese", "Lactobacillales"];

  for i in list {
      print!("{} -> ", i);
  }
}
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

## 

<img src="../fallover.svg" width="75%" />

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

## 

<img src="../jump.svg" width="75%" />


## if let

```rust-norun
// result: enum Option<T, E> { Ok(T), Err(E) }
if let Err(error) = result {
  println!("Fehler: {:?}", error);
  return;
}
// result: Ok(T), keinesfalls Err(E)
let result = result.unwrap();
```

<img src="../hello.svg" width="50%" />

# Y U NO parallel?

## Data Races?

* threads greifen auf die selben Daten zu
* unsynchronisiert
* mehrere Schreiben

## Closures
```rust-norun
let f1 = move || println!("from my env: {:?}", env_stuff);
let f2 = move |a, b, c| { /* ... */ };
```

> Without move, a closure may be tied to the stack frame that created it, while a move closure is self-contained. This means that you cannot generally return a non-move closure from a function, for example.

## Closure types

* `FnOnce`: The closure can be called once. A closure called as FnOnce can move out values from its environment.
* `FnMut`: The closure can be called multiple times as mutable. A closure called as FnMut can mutate values from its environment. FnMut inherits from FnOnce (i.e. anything implementing FnMut also implements FnOnce).
* `Fn`: The closure can be called multiple times through a shared reference. A closure called as Fn can neither move out from nor mutate values from its environment. Fn inherits from FnMut, which itself inherits from FnOnce.


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

## Scoped threads

* Stack-Variablen aus der Umgebung des thread-Closures müssen **moved**
  werden
* Sonst: Threads können Lifetime des spawnenden Stackframes überleben
* **Lösung:**
  * `thread_scoped::scoped(...) -> JoinGuard`
  * impl Drop for JoinGuard: wartet im Spawner auf Beendigung des Threads

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




# Traits

## Traits

Vergleiche: Java Interfaces, Haskell Typeclasses

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

## Iterator trait

[std::iter::Iterator](http://doc.rust-lang.org/stable/std/iter/trait.Iterator.htm)

```rust-norun
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;

    /* ... */
    fn collect<B>(self) -> B where B: FromIterator<Self::Item>;
}
```

## for-Loops

```rust-norun
pub trait IntoIterator where Self::IntoIter::Item == Self::Item {
    type Item;
    type IntoIter: Iterator;
    fn into_iter(self) -> Self::IntoIter;
}
```

## Deref-Coercions

> If you have a type U, and it implements Deref&lt;Target=T&gt;,
> values of &U will automatically coerce to a &T

```rust
fn foo(s: &str) {
  println!("&str: {}", s);
}

fn main() {
  // String implements Deref<Target=str>
  let owned = "Hello".to_string();

  // therefore, this works:
  foo(&owned);
}
```

# eco system

## Links

### News && Community

* [this-week-in-rust.org](https://this-week-in-rust.org/)
* [/r/rust](https://www.reddit.com/r/rust)
* [users.rust-lang.org](https://users.rust-lang.org)

### Resources

* [rustbyexample.com/](http://rustbyexample.com/)
* [The Rust Programming Language](https://doc.rust-lang.org/stable/book/)
* [The little book of Rust Macros](https://danielkeep.github.io/tlborm/)
* [Rustonomicon: Dark Arts of unsafe rust](https://doc.rust-lang.org/nightly/nomicon/)

## Mehr Tooling

* `clippy`: 100 more Warnings
* `racer`: Completion

# Stop! hacking time

## Checklist:

* ☑ install rustc\
* ☑ learn cargo\
* ☑ scan crates.io\


# Part 2 - konkrete Beispiele

---

# Beispiel für Parameterisierte Typen

## Fresh in Hyper

* **Motivation:** HTTP Response Headers können nur geändert werden wenn Body
  noch nicht gesendet wird.
* **Lösung:** Extra-Typparameter: `Fesh`, `Streaming`, `Any`

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
