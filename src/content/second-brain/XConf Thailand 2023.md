---
title: XConf Thailand 2023
date: 2023-09-29
slug: xconf-thailand-2023
publish: true
tags:
  - notes
draft: false
no_feed: false
filepath: src/content/second-brain/XConf Thailand 2023.md
---

***

# Green software: How can tech contribute to worldwide sustainability effort?

\[Chakrit Riddhagni]

* IT is 4th place polluter, with 2% carbon emission
* Green software
  * Principles
    * Energy efficiency
    * Hardware efficiency
    * Carbon awareness
* Carbon equivalence - `CO2eq`
  * 1 tons Methane = 80 tons of CO2 -> 80 tons CO2eq
* [Cloud Carbon Footprint](https://www.cloudcarbonfootprint.org/) - opensourced, works with multiple cloud
* Problem of CO2eq of software
  * legacy Bubble Sort (10g CO2eq) vs modern Quick sort (300g CO2eq), is bubble sort "greener"? not necessarily
  * There are many factors : Amount of data, time run, hardware used, energy source
* SCI (Software Carbon Intensity) = ((E x I) + M) per R
  * R is "functional unit" e.g. per user or per device
  * Kind of like Big-O notation
* Energy Efficiency
  * Reduce overhead
    * data center overhead
      * Metrics: PUE (Power usage effectiveness)
    * Computer overhead
      * Hardware utilization
        * High hardware utilization (ใช้ hardware ให้คุ้ม)
  * Optimize your software
    * [Green Software Patterns](https://patterns.greensoftware.foundation)
      * e.g. Cache static data, set storage retention policies, optimize image size, adopt serverless for AI/ML workload
* Hardware Efficiency
  * Carbon efficiency in hardware lifecycle
    * Embodied carbon
    * Amortization - longer lifespan is better
* Carbon awareness
  * "Not all energy created equals"
    * Spatial factor - power plant in different countries
    * Time factor - Wind & solar in nighttime reduce but the demands remain the same -> burn more coal -> more CO2
  * Carbon-aware computing
    * Do more computing when the electricity is cleaner, do less otherwise
    * [Carbon-aware SDK](https://github.com/Green-Software-Foundation/carbon-aware-sdk)
  * Carbon Hack 2022
    * [Capybara](https://taikai.network/en/gsf/hackathons/carbonhack22/projects/cl975ox6936793201uh6zkzqkrt/idea) - a [Github Action](https://github.com/marketplace/actions/capybara-action) used to reschedule workflow runs depending on the most carbon efficient time
  * Branch Magazine - A sustainable and just internet for all
    * [Changes color depend on greenness of the grid](https://branch.climateaction.tech)
* Myth - Sustainability is all about domain expertise
  * 3 Emission scopes - Direct & Indirect
    * Scope 3 is big (downstream & upstream impacts)
  * [Terrascope](https://www.terrascope.com) Smart decarbonization platform
* What can I do?
  * Check out green software patterns
  * Practice your data skill

# Self-service for delivery value with platform engineering

\[Bhuridech Sudsee, Variya Sirilertworakul]

* Traditional way - "You want a database? Open a ticket" problem
  * Ticket dancing, duplicate (manual) tasks, numerous meetings
* Dev team develops, ops team deploy
  * Deployment phase is the most chaotic phase
* "DevOps" way
  * "You build it, you run it"
  * [But so many tools...](https://landscape.cncf.io) = cognitive load
  * DevOps problems
    * Cross functional team, but operation team downed on operation team -> workload bottlenecks, lack of ownership, cognitive load
* Platform Engineering
  * The way to enable developer `self-service` by integrating technologies and tools in your delivery setup into `paved road`
* Ticket-based --- `Self-Service` --- DIY
  * Dev - Balance between Controllability & cognitive load
  * Ops + Product mindset -> Platform Team
    * Reduced support burden, focus on building product (self service platform)
  * e.g. DB self-service
  * IDP - Internal Developer Platform
    * Multiple self services
* Paved Road
  * Optional, Abstraction but transparent, Extensible
  * "Guardrails" A standardized set of rules for mitigating risks
* Case studies
  * Different logging formats
    * Each service uses own format without standard
    * Solution - Structured log libraries from platform team
    * Faster issue resolution, standardization, increate integrability
  * Lack of policy control
    * k8s pod uses unlimited capacity -> OOM kill
    * Solution - Org policies with admission controller (guardrails)
      * Resource governance
      * Risk mitigation
  * Mixing of concerns in delivery setup
    * Simplify for devs e.g. "Small/Medium/Large DB"
      * Devs don't have concerns about VPCs, sg, IAM roles, etc.
  * Too much effort to bulid observability system
    * Plug & play - Workload analysis dashboard (Grafana?)

# Our adventure in building an internal developer platform

\[Michael Longerich, Raksit Mantanacharu]

* Paradox of choices
* IDP is a "product"
* CI/CD Pipeline as a Service - Minimal configuration, drag and drop, low code
* 4 Phases
  * Assess and recommend
    * Platform Key Principles
      * Consumer-first
      * Provide a paved road
      * Product over project
      * Enabler over gatekeeper
    * Capability map - Choose some items (prioritization)
    * Delivering early with "thin vertical slices" (small slices of desirable + usable + functional combined)
    * Measure of success
      * Accelerate Metrics
      * SPACE Metrics
      * Net Promoter Score
      * Capability voluntary adoption rate
    * Approaches
      * Research
      * User Interviews
      * Developer needs + best practices + experience
  * Baseline and prove
    * Challenges
      * There are many areas of complexity outside just their product
    * Laying down the foundation
      * provide a paved road, support majority of them
        * no standards will be universally appropriate anyway
      * Enabling teams with capabilities and guidance
      * Provide knowledge and support
    * Build the right abstractions
      * Provide useful mental model that shields the user
      * Avoid hiding essential details causing user to be misled
    * Establish empathy with internal devs
      * Product manager, product engineer
      * Collaborate with early adopters
      * Feedback channels
    * Baseline and prode strategy
      * Buffet over a-la-carte
      * dev friendly & functional
  * Seed and scale
    * Welcome new adopters to the platform
      * New requirements
    * Challenge
      * Devs not aware of platform existence
      * Inconsistence
    * Do marketing
      * Naming, branding
      * Demo/showcase
      * Newsletter
      * Knowledge sharing
      * Case studies & success stories
    * Documentation (for everyone)
      * Tutorials, how-to guides, explanation, references
    * Versioning - Prevent breaking changes
    * Adoption Dashboard to measure success
  * Evolve and Support
    * Add new features, capabilities
* Who can't benefit from IDP
  * Small engineering teams
  * Rapid discovery, experimentation phase
  * Large amount of desirable diversity
* Key takeaways
  * Developers are our users
  * Standardization over individual customization
  * Treating a platform as same as other software developments

# Successful digital transformation: Outcome-driven teams, reward and metrics

\[Vijay Iyer, Shyaamkumaar Krishnamoorthy]

(did not take notes)

# The more we test, the worse?

\[Pongpipat Kawlerk, Xudong Yang]

* Case studies
  * Therac-25
  * PonoMusic
    * Tests hinder the project, and too late in the market
* Common complaints
  * Why doesn't your test detect the issue?
  * Our automated tests take a long time and are flaky
  * The metrics are good, but I don't feel it
* "Build quality into the product rather than trying to inspect it afterward." - W. Edwards Deming
* How can we do better?
  * Don't work in silo
  * Quality != no bugs
  * Prevent detect instead of fixing
* What's wrong with automated tests
  * Slow
  * Flaky
  * Issues still found
* Test pyramid
  * Anti-patterns : Ice cream cone, cupcake shape (low unit tests)
* Law of instrument - If all you have is a hammer, everything looks like a nail
* Place the tests in the right layer (not E2E everything)
* Quality measurement
  * Common examples: Find X bugs in Y month, or make the test coverage Z%
  * Tester's KPI to find more bugs, devs to make less bugs
  * Always stay vigilant, even if you get good numbers
* Key takeaways
  * (img)

# FinOps: Principles and cloud cost observability

Athakorn Ongsiriporn

* Sharing experiences as SRE/Platform Team in building FinOps for multiple k8s clusters
* Problems & Goals
  * Cloud costs
  * Expectations, enterprises aspire to have $8 of $10 saved going to cloud
* Centralised Observability Cluster
  * Monitor multiple clusters
  * SRE Monitor & maintain
* Reduce cost while efficiency is not reduced
* FinOps = Finance + DevOps
  * Definitions
    * Maximize business value
    * Increase revenues
    * Build scalable culture of usage
    * Optimize spend
  * It's about "Making Money"
  * Principles - https://finops.org
    * Teams need to collaborate
    * Decisions are driven by business value of cloud
    * Everyone takes ownership for their cloud usage
    * FinOps data should be accessible and timely
    * A centralized team drives FinOps
      * or Champions
    * Take advantage of the variable cost model of the cloud
* Provide tools for monitor cost and resources
* Steps
  * Inform
  * Optimize
  * Operate
* FinOps is never ending journey

# Democratizing data access through LLMs

\[Pee Tankulrat]

Rethinking how we interact with data

* Humanity's insights - driven by easier "access to knowledge"
  * The lower the friction to knowledge access, the better the world becomes
* Depicts how barrier is lowered
  * Picture Q\&A
  * Generate SQL from schema & question
* RAG (Retrieval augmented generation)
  * Integrate proprietary data with LLM
* Limitations
  * Can expose inappropriate, harmful, bias, dangerous content
    * Guardrails to help against adversarial inputs
* Data strategy > AI strategy
  * Data is Findable, Accessible, Interoperable, Reusable

# Legacy modernization made practical: A live coding example of modernization patterns

\[Salah Chalermthai, Wanichnun Sinpitak]

* Why legacy modernization is hard?
  * user impact
  * complex domain knowledge
  * outdated tech
  * unsafe refactoring
* Keywords
  * Modernization strategy
  * Decompose patterns
    * Strangulation Pattern (Strangler Fig)
      * Indirection layer
  * Data migration patterns
    * One-off
    * Migration on demand - Data transfer as needed
    * Initial with deltas - Initial full migration followed by periodic updates
    * CDC (Change Data Capture) - Realtime continuous replication
    * Tools
      * [Debezium](https://debezium.io)
  * Measure of success
  * Thin slices approach
  * 6Rs - Help prioritize investment
    * Retain/Retire
    * Rehost
    * Repurchase
    * Re-platform
    * Refactor
    * Re-architect
  * Scientist Pattern - Test in production, but safer
    * Run function in both 2 modes, compare the result e.g. price calculation
    * (However I cannot find this name so I asked ChatGPT and it's [Parallel Change / Shadowing](https://aiarchives.org/id/Nts36I1zy5hWRsbOHKrI))
  * Modernization Scorecard

# You should stop writing code

\[Peerapong Maitriwong]

* Software Quality
  * Strategy
  * Design
  * Technology
* Code Quality
* Continuous ~~delivery~~ agony
* "Code-centric mindset"
  * Focusing too much on code, but lose sight of the big picture
* Code serves as your means of communication
  * Effective communication requires a deep understanding
* Coding cycle < Software development lifecycle < Product development process < Business strategy
* "Stop Coding, Start Communicating"
  * Talk with domain driven expert e.g. Accountants
* Understand people
  * Communication
  * Collaboration
  * Iteration
  * Incremental
* Start with yourself
  * Change your learning approach
  * You are not developer. You are a business person with a technical knowledge.
  * Take responsibility
  * Contribute to the conversation
* Shorten line of communication
  * Gossip effect
* Flatten your structure
* (Quotes from many books)

# Why organizations fail in investing in research and design (without Ops)?

\[Chanon Patarajierapun, Pipat Waitayaworanart]

(did not take notes)

# Panel discussion: Agile in the modern age

\[Kotchakorn Ded-Dechanukul, Pete Chemsripong, Siroratt Suntronsuk, Twin Panichsombat]

* Conway's Law - orgs will design systems that mirror their communication structure
* Multi vendors culture - Different principles
  * Remove the "label" from the team, vendor
  * Build trust, one by one, there is no shortcuts
* [Tuckman's stages of group development](https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development) - Forming, Storming, Norming, Performing
* "จะ Remote ได้ ต้อง Co-locate ให้ได้ก่อน"
  * ODDS ให้คนเข้า office first 16 months
* Team lunch tells a lot
* 1-on-1s
