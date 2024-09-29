---
title: RubyConf TH 2023
date: 2023-10-07
slug: rubyconf-th-2023
publish: true
tags:
  - ruby
  - notes
draft: false
no_feed: false
filepath: src/content/second-brain/RubyConf TH 2023.md
---

## Component Driven UI with ViewComponent gem \[Radoslav Stankov]

https://rstankov.com/appearances - [Slides](https://speakerdeck.com/rstankov/component-driven-ui-with-viewcomponent-gem)

* Made [Angry Building](https://angrybuilding.com/en)
* Product Hunt uses React - GraphQL - Ruby stack
* Rails is good, but `app/helpers` ?
* [ViewComponent](https://viewcomponent.org) gem
  * Create reusable, testable, and encapsulated view components

```ruby
render MessageComponent.new(name: "World")
# or
component :message, name: "World"
```

* [Preview components](https://viewcomponent.org/guide/previews.html) (like Storybook)
* Use ViewComponent to DRY, not for replace plain html or pure functions.
* [Slots](https://viewcomponent.org/guide/slots.html) for nesting components : `renders_one` & `renders_many`
* `fetch_with_fallback` to handle fetch errors
* Have `before_render` [lifecycle](https://viewcomponent.org/guide/lifecycle.html) method
* PageHeader component
  * Breadcrumbs
  * Action buttons
* Yield data back by using Rails' `helpers.content_for`
* Render table results with component & slots
* Button components

## Learn to delegate; like a boss \[Elle Meredith, Lachlan Hardy]

* Storytelling about Jack, sr dev turned eng. manager
* Delegation is...
  * Designating responsibility to someone else
  * An essential time management and team development strategy
  * Entrusting our authority to others... while remaining accountable for the outcome
* Thoughts e.g.
  * I feel bad about giving them more work
  * I'll do the best job here, so I'll do it myself
  * I don't have time to teach others
  * I don't know how to let go!
* Need mindset shift, learn to delegate
* Delegation is important
  * Higher revenue (33%)
  * Empowering employees
* For leader
  * Reduce burnout risks
  * Free up time
  * Deepen relationship & trust
* For team
  * Increased motivation engagement, productivity
  * Growing skill
* For \[...]
* Autonomy vs Micromanagement
* Delegation != Abdication
* "Make yourself obsolete"
* Agree on DQR: Deadline/Quality/Reporting
* Learning how to lead, without being in control

## Error 418 - I'm a teapot \[Matthew Lindfield Seager]

* 1st April curses
* HTCPCP (CP^2)
  * Request GET,POST -> WHEN,BREW
  * Responses
    * 406 Not Acceptable
    * 418 I'm a teapot
* Use [Rack](https://github.com/rack/rack) to build one in Ruby

## Big Corps, Big Worries. Some points on selling Ruby to Big Corps. \[Chakrit Wichian]

* https://www.sawaddee.com
* "Ruby is Dead"
  * So what?
  * Ruby is Stable/mature
  * Java has some sayings
* "Ruby does not scale"
  * If your code on GitHub?
  * Have you ever buy from Shopify?
  * Did you book on AirBnB?
* "Ruby devs are expensive" / "Ruby devs are hard to find"
  * They are developers with "inflated skill"
  * Ruby Devs > Corp Devs
  * Much higher ROI

## Data Indexing with RGB (Ruby, Graphs & Bitmaps) \[Benji Lewis]

([Previously talked in RubyConf Houston 2022](https://www.classcentral.com/classroom/youtube-rubyconf-2022-data-indexing-with-rgb-ruby-graphs-and-bitmaps-by-benjamin-lewis-235728))

* MeasureStore - Store measures
* Cross market analysis
* Cross comparison
* Harmonization
* Bitmap Store
* Store on Redis

## Keynote: Breaking Barriers — Empowering the Unbanked with Innovative Tech \[Bernard Banta]

* https://rubycommunity.africa
* Understanding the challenges in unbanked people (~1.4B over the world)
  * Feature phones, low-end smartphones
* USSD (Unstructured Supplementary Service Data) via SMS
  * USSD App for feature phones

## A Beginner's Complete Guide to Microcontroller Programming with Ruby \[Hitoshi Hasumi]

* PicoRuby - Wins Fukuoka Ruby Award
* Uses Raspberry Pi Pico (RP2040 chip)
* R2P2: PicoRuby shell - github.com/picoruby/R2P2
* GPIO class
* ADC - Temperature (built-in in RP2040, or use discrete parts like thermistor)
* [PRK](https://github.com/picoruby/prk_firmware) - Keyboard firmware
* `irb`
* runs ruby file
* Drag file and drop within the mounted R2P2 drive when connected to its USB
* `/home/app.rb` runs on startup

## Avoiding Disaster: Practical Strategies for Error Handling \[Huy Du]

* Programming is `f(x) = y`
* Unexpected Error
* Exception in Ruby
  * Type `e.class`
  * Message `e.message`
  * Backtrace `e.backtrace`
* Create `Business Logic` layer between application's Controller and Model
* Return `Monad` as a result for better reusability
  * Monad is a structure that wraps return result of function in monadic way
* e.g. Simple monad is a struct with `:successful?`, `:results`, `:errors`, etc.
* Change business logic to Service Object
* Monadic handling by using Monad Result to manage the flow of execution

## Event Streaming Patterns for Ruby Services \[Brad Urani]

* ProCore, IPO'd
* Streaming Platform
* Big Rails app (monolith)
* How do we break it up? and ensure end-to-end "consistency"
* Postgres -> AI, Snowflake, Elasticsearch, other services' Postgres
* Rails --POST-> Rails : is this consistent?
* gRPC?
* vs Amazon Kinesis, Google Cloud Pub/Sub, Sidekiq, RMQ, SQS
* Kafka
  * Producer --topic-> Consumer
* Kafka features
  * At-least-once delivery (Consistent)
  * Guaranteed Ordering (Consistent)
  * Multi-cast (Democratized)
  * Durable / Replay-able (Decoupled, High availability)
* Rails --Kafka-> Rails
* Managed Kafka
  * Amazon MSK
  * Heroku
  * Confluent Cloud
* Karafka gem (uses librdkafka)
* Problem is data in Kafka must be consistent with app's database
  * Dual Write Problem
    * Also the same problem with Sidekiq
  * Solution, btw complicated - Use database `Change Data Capture`
  * Pg + Debezium on Kafka Connect
    * Schema leaking
  * Transactional Outbox (separated `outbox` table) with Change Data Capture
  * Event Sourcing (Log first then insert db with consumer)
    * Asynchronous
    * CQRS
    * Hard for startups
* Idempotency
  * You may get message twice (e.g. Insert x 2, Delete x 2)
* Dead letter queue
  * Don't recommended on most use cases
    * It broke guaranteed order
* Use cases
  * New user signup
    * Kafka multicasts to Email, Search, and Suggestion services
  * Kafka Connect - Java
  * Data lake - into S3 buckets
  * Materialized Views
    * Consumers populate db views for Rails app to query
  * Region to Region replication
    * MirrorMaker
* Data structure
  * JSON
  * Protobuf
  * Apache Avro
* Article
  * What Every Software Enigneer Should mlnw near realtime data's \[...]

## The Art of Abstracting: Key Factors for Success in a Core/Platform/BuildingBlocks team \[Omar Sotillo Franco]

(The presenter is absent, gws!)

## Panel discussion \[Various panelists]

* What are effective ways to support junior devs in the Ruby community?
* How do you foresee generative AI impacting the future of programming?
* How can Ruby devs avoid burnout and maintain a sustainable work-life balance?
  * Exercise
* What tips or advice would you offer to people looking to present at Ruby or tech conf?
  * Start small & simple (eg. lightning talks at smaller conf)
  * few takeaways, focus on core messages
  * practice
  * ppl love live demos (high risk btw)
  * Be clear on abstract/message on submitting CFPs to get the talk accepted
  * https://speakerline.io

## Kickboxer vs Ruby - the state of MRuby, JRuby and CRuby \[Michael Milewski, Selena Small]

* Actuator (mRuby)
  * ESP32 with mruby
  * ESP-IDF
  * mqtt client
* Server (cRuby)
  * mqtt
  * mosquitto
* Mobile app
  * Tried many solutions
    * jRuby -> [Ruboto](http://ruboto.org) -> RubyMotion -> jruby on iSH terminal -> Rubyist -> Termux -> jruby on raspi -> ruboto+arduino ✅

## Passkeys

* a replacement for password
* public/private keypair
* use with biometrics
  github.com/ruby-passkeys

## Rails Performance Monitoring 101: A Primer for Developers \[Rishi Jain]

* Misconceptions
  * Cache = Fast
  * Bigger hardware = Fast
* APM - Application Performance Monitoring
  * NewRelic
  * DagaDog
  * Scout
  * AppSignal
  * etc.
* Common mistakes
  * N+1 queries
    * `#count` vs `#size`
    * `#where` vs `#find`
    * Convert queries to `has_one` then eager load it
    * rack-mini-profiler, Bullet
  * Lack of background jobs
  * Timeout from 3rd party services
  * Missing db indices
    * Query with `#explain`, see the query plan
      * `Seq Scan` is slow (should be `Index Scan`)
  * The order of compound db index
  * [SQL performance explained](https://sql-performance-explained.com)

## Keynote: Thriving in Uncertainty \[Ben Halpern]

* https://dev.to
* https://isrubydead.com
* Specialists thrive in kind environment
* Generalists thrive in wicked environment
  * Adaptability
  * Higher-order Thinking
  * Problem Reformulation - reframing
  * Collaboration & Communication
