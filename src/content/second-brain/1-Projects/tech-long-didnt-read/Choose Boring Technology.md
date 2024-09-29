---
title: "Choose Boring Technology"
date: 2022-08-20
slug: tech-long-didnt-read-choose-boring-technology
publish: true
tags:
- tech-long-didnt-read 
filepath: src/content/second-brain/1-Projects/tech-long-didnt-read/Choose Boring Technology.md
---

src: https://boringtechnology.club

![](Images/Cover%20-%20Choose%20Boring%20Technology.png)

## Summary

* The answer of "How do you make devs happy?" for many developers: Chase shiny objects
* Imagine you have "Innovation Tokens" to use for building new things, and you have 3 tokens to use. With limited resources it will make less sense to innovate within new databases or new programming paradigms (NodeJS, MongoDB at that point of time) instead of the features or company missions.
* On new, shiny technologies there will be more "Unknown Unknowns" than the old, boring technology.
* Boring tech's failures are already well-understood
* The tech combination also matters, e.g. Ruby is pretty much the same as Python, but Redis != Memcached
* When choosing new tech (like Cassandra for database), make sure that the short-term benefits exceeds than the long-term costs of operating it. But most of the time, it doesn't.
* Make a mapping between problems and technologies to solve them, using same technology to solve more than one problem will reduce the cost while retaining same benefit.
* From the cost function: `total_cost = sum(maintenance_cost) - sum(velocity_benefit)`. If cost per tech is cheap, you can use many different techs. If each tech is expensive, pick few techs and share more problems per tech.
* Also having many techs will discards synergies when everyone is using shared tech
* In reality, new tech choices are expensive and the maintenance cost will dominate the velocity benefit, since operating tech on production is hard, there are many things to worry about for setting up & maintaining new tech on production.
* When to use exciting new tech
  * Communicate more, ask how you would solve the problem with the existing stack
  * Find low-risk ways to get started
  * Commit to removing the old, redundant system
* Use proven tech, choose a few globally optimal tech, master the tech, ship stuff
* Worry about the big picture (the product) more than the database to pick

## Summary (Thai)

* คำถาม: ทำยังไงให้ Developer มีความสุข คำตอบ: ให้เค้าเลือก Technology ที่จะใช้เอง เช่น โปรเจกต์ใหม่เขียนด้วย Clojure กันเถอะ (ในบทความใช้วลี "Chase shiny objects") ซึ่งหลายครั้งจะเกิดปัญหาตามมา
* วิธีแก้ปัญหา: ให้ลองคิดดูว่าเรามี Innovation Tokens แค่ 3 เหรียญในการใช้สร้าง Product ใหม่ ปรากฏว่าแค่ทำ Feature นึงก็ใช้ Token นึงแล้ว การใช้ Token เพียงเพื่อจะลอง Tech ใหม่ๆ จะดูไม่ค่อย Make Sense (เช่นเลือกภาษาใหม่ หรือใช้ Database ที่เราไม่เคยใช้)
* การเลือก Tech ใหม่มักจะมี "Unknown Unknowns" หรือสิ่งที่เราไม่รู้ ว่าเราไม่รู้ อยู่มาก อย่างเช่นบั๊กที่ยังไม่ค่อยมีคนเจอแล้วการแก้คือต้องไปงมกับมันเป็นเดือนๆ
* Tech เก่าๆ จะมี Unknowns น้อยกว่า เพราะมันจะมีคนที่เจอปัญหาและมักจะแก้ไขมันไปแล้ว
* เวลาเลือก Tech ใหม่ๆ ต้องมั่นใจว่า Velocity Benefit หรือประโยชน์จากความสะดวกของการใช้ Tech ที่จะได้ในระยะสั้น คุ้มค่ากับการ Maintenance ในระยะยาว ซึ่งแทบทุกครั้ง มันไม่คุ้ม
* ลองทำ Mapping ระหว่าง Problems และ Technologies ที่ใช้แก้ปัญหา ถ้าเราใช้ Tech เดียวกันในการแก้ได้หลายปัญหา จะลด Maintenance Cost ในการใช้แต่ละ Technology ได้
* จากสูตร `total_cost = sum(maintenance_cost) - sum(velocity_benefit)` ถ้า Maintenance Cost แต่ละอย่างไม่สูง เราสามารถเลือกใช้ Technology ได้หลายอย่าง แต่ถ้า Maintenance Cost สูง ก็ควรที่จะเลือก Technology น้อยอย่างลง แล้วให้แต่ละ Technology แก้ปัญหา Problem หลายอย่างขึ้น
* แต่ในความเป็นจริง Maintenance Cost จะสูงเสมอ เพราะการนำ Tech ขึ้น Production จะมีปัญหาอื่นอีกเยอะ เช่น Deployment, Scaling, Metrics, Logging และอีกมากมาย
* แล้วเมื่อไหร่ถึงจะได้ใช้?
  * คุยกันเยอะๆ ตั้งคำถามว่าถ้ายังใช้ Tech Stack เดิมจะแก้ปัญหาได้ไหม อย่างไร
  * หาวิธีที่มีความเสี่ยงต่ำในการใช้ เช่นทำ PoC เพื่อทดลองและเพิ่มความมั่นใจในการใช้ Tech นั้น
  * ต้องตั้งใจหาทางนำ Tech เก่าที่ซ้ำซ้อนออกด้วย ไม่เช่นนั้นจะต้อง Maintain ทั้งคู่เพราะทิ้งของเก่าไม่ได้
* ฉะนั้น ใช้ Tech ที่พิสูจน์ตัวเองมาแล้ว เลือกให้ดี ใช้ให้เชี่ยวชาญ
* นึกถึงภาพรวมของ Product ให้มากกว่าแค่มาเลือกกันว่าใช้ Tech เช่น Database ตัวไหนดี
* "Happiness comes from shipping meaningful work."

## TLDR

Prefer proven technology even if it is boring.
