"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

// Gallery data – all photos from public/jednohroby, public/dvojhroby, public/urnaky + other categories
const projects = [
  // Kuchyňské desky
  { id: 5000, category: "Kuchyňské desky", image: "/kuchynske-desky/20200523-152615.jpg", title: "Kuchyňská deska" },
  { id: 5001, category: "Kuchyňské desky", image: "/kuchynske-desky/20200523-152648.jpg", title: "Kuchyňská deska" },
  { id: 5002, category: "Kuchyňské desky", image: "/kuchynske-desky/20210309-185449.jpg", title: "Kuchyňská deska" },
  { id: 5003, category: "Kuchyňské desky", image: "/kuchynske-desky/20210309-185501.jpg", title: "Kuchyňská deska" },
  { id: 5004, category: "Kuchyňské desky", image: "/kuchynske-desky/20220430-155621.jpg", title: "Kuchyňská deska" },
  { id: 5005, category: "Kuchyňské desky", image: "/kuchynske-desky/20220521-165330.jpg", title: "Kuchyňská deska" },
  { id: 5006, category: "Kuchyňské desky", image: "/kuchynske-desky/316494543-679616900418257-7576551999645847971-n.jpg", title: "Kuchyňská deska" },
  { id: 5007, category: "Kuchyňské desky", image: "/kuchynske-desky/317932907-819609425788147-5930048360522512229-n.jpg", title: "Kuchyňská deska" },
  { id: 5008, category: "Kuchyňské desky", image: "/kuchynske-desky/318093989-5773258299430582-6897449377950133334-n.jpg", title: "Kuchyňská deska" },
  { id: 5009, category: "Kuchyňské desky", image: "/kuchynske-desky/318197348-534464805251052-2641679863826867714-n.jpg", title: "Kuchyňská deska" },
  { id: 5010, category: "Kuchyňské desky", image: "/kuchynske-desky/362508295-1009851063535173-6194075147812673492-n.jpg", title: "Kuchyňská deska" },
  { id: 5011, category: "Kuchyňské desky", image: "/kuchynske-desky/362511142-285238977523963-3956035054275331862-n.jpg", title: "Kuchyňská deska" },
  { id: 5012, category: "Kuchyňské desky", image: "/kuchynske-desky/362545134-1345218036384873-1956878317843635489-n.jpg", title: "Kuchyňská deska" },
  { id: 5013, category: "Kuchyňské desky", image: "/kuchynske-desky/att.chn7um47l-kfmbbrpmtabopsvj4e4ulzxmhdfudfr9s.jpg", title: "Kuchyňská deska" },
  { id: 5014, category: "Kuchyňské desky", image: "/kuchynske-desky/att.k3uczbskyux8lmecxhzwxded9jfyllycjiijqkzy3ka.jpg", title: "Kuchyňská deska" },
  { id: 5015, category: "Kuchyňské desky", image: "/kuchynske-desky/att.xekesvfwda3ykczjg0d5r1fhopyileu05sfvrimqpae.jpg", title: "Kuchyňská deska" },
  { id: 5016, category: "Kuchyňské desky", image: "/kuchynske-desky/kuchyn.jpg", title: "Kuchyňská deska" },
  { id: 5017, category: "Kuchyňské desky", image: "/kuchynske-desky/p1010263.jpg", title: "Kuchyňská deska" },
  { id: 5018, category: "Kuchyňské desky", image: "/kuchynske-desky/pict0004-1.jpg", title: "Kuchyňská deska" },
  { id: 5019, category: "Kuchyňské desky", image: "/kuchynske-desky/pict0055.jpg", title: "Kuchyňská deska" },
  { id: 5020, category: "Kuchyňské desky", image: "/kuchynske-desky/pict0155-1.jpg", title: "Kuchyňská deska" },
  { id: 5021, category: "Kuchyňské desky", image: "/kuchynske-desky/pict0156.jpg", title: "Kuchyňská deska" },
  { id: 5022, category: "Kuchyňské desky", image: "/kuchynske-desky/tel074.jpg", title: "Kuchyňská deska" },
  { id: 5023, category: "Kuchyňské desky", image: "/kuchynske-desky/tel152.jpg", title: "Kuchyňská deska" },

  // Památníky
  { id: 4000, category: "Památníky", image: "/pamatniky/0300017f.jpg", title: "Památník" },
  { id: 4001, category: "Památníky", image: "/pamatniky/03000187.jpg", title: "Památník" },
  { id: 4002, category: "Památníky", image: "/pamatniky/030001bd-1655889600.jpg", title: "Památník" },
  { id: 4003, category: "Památníky", image: "/pamatniky/030001c7-1655889600.jpg", title: "Památník" },
  { id: 4004, category: "Památníky", image: "/pamatniky/img-20171004-133715-1655889600.jpg", title: "Památník" },
  { id: 4005, category: "Památníky", image: "/pamatniky/img-20171219-142511-1655889600.jpg", title: "Památník" },
  { id: 4006, category: "Památníky", image: "/pamatniky/img-20180406-151500-1655889601.jpg", title: "Památník" },
  { id: 4007, category: "Památníky", image: "/pamatniky/img-20180406-151510-1655889602.jpg", title: "Památník" },
  { id: 4008, category: "Památníky", image: "/pamatniky/img-20180510-181901-1655889602.jpg", title: "Památník" },
  { id: 4009, category: "Památníky", image: "/pamatniky/img-20180510-181909-1655889603.jpg", title: "Památník" },
  { id: 4010, category: "Památníky", image: "/pamatniky/img-20180814-120153-1655889603.jpg", title: "Památník" },
  { id: 4011, category: "Památníky", image: "/pamatniky/img-20181004-113420.jpg", title: "Památník" },
  { id: 4012, category: "Památníky", image: "/pamatniky/img-20181004-113433.jpg", title: "Památník" },
  { id: 4013, category: "Památníky", image: "/pamatniky/img-20181004-125512-1655889604.jpg", title: "Památník" },
  { id: 4014, category: "Památníky", image: "/pamatniky/img-20181007-122803-1655889604.jpg", title: "Památník" },
  { id: 4015, category: "Památníky", image: "/pamatniky/img-20181007-122815.jpg", title: "Památník" },
  { id: 4016, category: "Památníky", image: "/pamatniky/pomnik.jpg", title: "Památník" },

  // Schody a parapety
  { id: 9000, category: "Schody a parapety", image: "/schody-parapety/0300003c.jpg", title: "Schodiště a parapet" },
  { id: 9001, category: "Schody a parapety", image: "/schody-parapety/20220511-201213-1.jpg", title: "Schodiště a parapet" },
  { id: 9002, category: "Schody a parapety", image: "/schody-parapety/20220521-165226-1.jpg", title: "Schodiště a parapet" },
  { id: 9003, category: "Schody a parapety", image: "/schody-parapety/20220521-165244-1.jpg", title: "Schodiště a parapet" },
  { id: 9004, category: "Schody a parapety", image: "/schody-parapety/416609374-1683810558691311-5986509356530019099-n.jpg", title: "Schodiště a parapet" },
  { id: 9005, category: "Schody a parapety", image: "/schody-parapety/416697487-1295328754487111-367587194833755778-n.jpg", title: "Schodiště a parapet" },
  { id: 9006, category: "Schody a parapety", image: "/schody-parapety/416721095-676515258005540-9032807430603609848-n.jpg", title: "Schodiště a parapet" },
  { id: 9007, category: "Schody a parapety", image: "/schody-parapety/417147549-203445206179605-1056675864359410225-n.jpg", title: "Schodiště a parapet" },
  { id: 9008, category: "Schody a parapety", image: "/schody-parapety/418727633-908188344211231-473729763168416853-n.jpg", title: "Schodiště a parapet" },
  { id: 9009, category: "Schody a parapety", image: "/schody-parapety/418925644-1449836479221514-1722086673341243734-n.jpg", title: "Schodiště a parapet" },
  { id: 9010, category: "Schody a parapety", image: "/schody-parapety/421765623-384258390966026-6219725941781536334-n.jpg", title: "Schodiště a parapet" },
  { id: 9011, category: "Schody a parapety", image: "/schody-parapety/421788080-398290089380537-4649196934886658256-n.jpg", title: "Schodiště a parapet" },
  { id: 9012, category: "Schody a parapety", image: "/schody-parapety/att.35rnk3fh1yfdnorsqg4wvkhmgopigduyo3luosw3rhe.jpg", title: "Schodiště a parapet" },
  { id: 9014, category: "Schody a parapety", image: "/schody-parapety/att.weocn6vodfssckakw21wrggaitvc5f4m8w1kjhmycuc.jpg", title: "Schodiště a parapet" },
  { id: 9016, category: "Schody a parapety", image: "/schody-parapety/fotografie0661.jpg", title: "Schodiště a parapet" },
  { id: 9017, category: "Schody a parapety", image: "/schody-parapety/fotografie0731.jpg", title: "Schodiště a parapet" },
  { id: 9018, category: "Schody a parapety", image: "/schody-parapety/fotografie0739.jpg", title: "Schodiště a parapet" },
  { id: 9019, category: "Schody a parapety", image: "/schody-parapety/img-20170728-111750.jpg", title: "Schodiště a parapet" },
  { id: 9020, category: "Schody a parapety", image: "/schody-parapety/img-20180416-145345.jpg", title: "Schodiště a parapet" },
  { id: 9021, category: "Schody a parapety", image: "/schody-parapety/img-20180416-145410.jpg", title: "Schodiště a parapet" },
  { id: 9022, category: "Schody a parapety", image: "/schody-parapety/pict0028.jpg", title: "Schodiště a parapet" },
  { id: 9023, category: "Schody a parapety", image: "/schody-parapety/pict0068.jpg", title: "Schodiště a parapet" },
  { id: 9024, category: "Schody a parapety", image: "/schody-parapety/pict0071.jpg", title: "Schodiště a parapet" },
  { id: 9025, category: "Schody a parapety", image: "/schody-parapety/pict0152.jpg", title: "Schodiště a parapet" },
  { id: 9026, category: "Schody a parapety", image: "/schody-parapety/snimek053.jpg", title: "Schodiště a parapet" },
  { id: 9027, category: "Schody a parapety", image: "/schody-parapety/tel068.jpg", title: "Schodiště a parapet" },
  { id: 9028, category: "Schody a parapety", image: "/schody-parapety/tel087.jpg", title: "Schodiště a parapet" },
  { id: 9029, category: "Schody a parapety", image: "/schody-parapety/telefon6023.jpg", title: "Schodiště a parapet" },
  { id: 9030, category: "Schody a parapety", image: "/schody-parapety/telefon6040.jpg", title: "Schodiště a parapet" },

  // Existing Interiér
  { id: 100, category: "Kuchyňské desky", image: "/kitchen.jpg", title: "Kuchyňská deska - Moderní kuchyně" },

  // Renovace
  { id: 101, category: "Renovace", image: "/renovation.png", title: "Renovace hrobu" },

  // ═══════════════════════════════════════════
  // Jednohroby (all 55 photos)
  // ═══════════════════════════════════════════
  { id: 1000, category: "Jednohroby", image: "/jednohroby/20200428-194923-1.jpg", title: "Jednohrob" },
  { id: 1001, category: "Jednohroby", image: "/jednohroby/20200516-152749-1.jpg", title: "Jednohrob" },
  { id: 1002, category: "Jednohroby", image: "/jednohroby/20200603-201729-1.jpg", title: "Jednohrob" },
  { id: 1003, category: "Jednohroby", image: "/jednohroby/20200619-181630-1.jpg", title: "Jednohrob" },
  { id: 1004, category: "Jednohroby", image: "/jednohroby/20200619-181630-2.jpg", title: "Jednohrob" },
  { id: 1005, category: "Jednohroby", image: "/jednohroby/20200718-174647-1.jpg", title: "Jednohrob" },
  { id: 1006, category: "Jednohroby", image: "/jednohroby/20200722-153024-1.jpg", title: "Jednohrob" },
  { id: 1007, category: "Jednohroby", image: "/jednohroby/20200821-140047-1.jpg", title: "Jednohrob" },
  { id: 1008, category: "Jednohroby", image: "/jednohroby/20200827-145952-1.jpg", title: "Jednohrob" },
  { id: 1009, category: "Jednohroby", image: "/jednohroby/20201015-174623-1.jpg", title: "Jednohrob" },
  { id: 1010, category: "Jednohroby", image: "/jednohroby/20201117-164555-1.jpg", title: "Jednohrob" },
  { id: 1011, category: "Jednohroby", image: "/jednohroby/20201212-152838-1.jpg", title: "Jednohrob" },
  { id: 1012, category: "Jednohroby", image: "/jednohroby/20210514-184327-1.jpg", title: "Jednohrob" },
  { id: 1013, category: "Jednohroby", image: "/jednohroby/20210626-164950-1.jpg", title: "Jednohrob" },
  { id: 1015, category: "Jednohroby", image: "/jednohroby/20210716-154026-1.jpg", title: "Jednohrob" },
  { id: 1016, category: "Jednohroby", image: "/jednohroby/20210802-210102-1.jpg", title: "Jednohrob" },
  { id: 1017, category: "Jednohroby", image: "/jednohroby/20210828-145821-1.jpg", title: "Jednohrob" },
  { id: 1018, category: "Jednohroby", image: "/jednohroby/20210904-184111-1.jpg", title: "Jednohrob" },
  { id: 1019, category: "Jednohroby", image: "/jednohroby/20210911-155835-1.jpg", title: "Jednohrob" },
  { id: 1020, category: "Jednohroby", image: "/jednohroby/20210915-180124-1.jpg", title: "Jednohrob" },
  { id: 1021, category: "Jednohroby", image: "/jednohroby/20210918-173120-1.jpg", title: "Jednohrob" },
  { id: 1022, category: "Jednohroby", image: "/jednohroby/20211023-143512-1.jpg", title: "Jednohrob" },
  { id: 1023, category: "Jednohroby", image: "/jednohroby/20211030-113656-1664398461.jpg", title: "Jednohrob" },
  { id: 1024, category: "Jednohroby", image: "/jednohroby/307540080-890663351895744-8333448645910597488-n.jpg", title: "Jednohrob" },
  { id: 1025, category: "Jednohroby", image: "/jednohroby/308274538-1771313923225317-1333983353326612422-n.jpg", title: "Jednohrob" },
  { id: 1026, category: "Jednohroby", image: "/jednohroby/310076367-1157632964857364-8711685431051388379-n.jpg", title: "Jednohrob" },
  { id: 1027, category: "Jednohroby", image: "/jednohroby/312347506-1173079913315471-1540234385365875057-n.jpg", title: "Jednohrob" },
  { id: 1028, category: "Jednohroby", image: "/jednohroby/313825524-3196051237374217-2431156373280213212-n.jpg", title: "Jednohrob" },
  { id: 1029, category: "Jednohroby", image: "/jednohroby/332529354-567976908621967-127221062284910181-n.jpg", title: "Jednohrob" },
  { id: 1030, category: "Jednohroby", image: "/jednohroby/334043951-3346628902227595-5681937726048045701-n.jpg", title: "Jednohrob" },
  { id: 1031, category: "Jednohroby", image: "/jednohroby/359097309-1010834513437071-7473639034701354737-n.jpg", title: "Jednohrob" },
  { id: 1032, category: "Jednohroby", image: "/jednohroby/405930885-1303116451086340-3811978907800929608-n.jpg", title: "Jednohrob" },
  { id: 1033, category: "Jednohroby", image: "/jednohroby/406057507-1537963653631588-1223105164708232488-n.jpg", title: "Jednohrob" },
  { id: 1034, category: "Jednohroby", image: "/jednohroby/406410426-906812774144201-216354386738529098-n.jpg", title: "Jednohrob" },
  { id: 1035, category: "Jednohroby", image: "/jednohroby/44e42b48-0646-4b4c-a558-70a1defca1de.JPG", title: "Jednohrob" },
  { id: 1036, category: "Jednohroby", image: "/jednohroby/IMG_4663.jpeg", title: "Jednohrob" },
  { id: 1037, category: "Jednohroby", image: "/jednohroby/IMG_4891.jpeg", title: "Jednohrob" },
  { id: 1038, category: "Jednohroby", image: "/jednohroby/IMG_5351.jpeg", title: "Jednohrob" },
  { id: 1039, category: "Jednohroby", image: "/jednohroby/IMG_5378.jpeg", title: "Jednohrob" },
  { id: 1040, category: "Jednohroby", image: "/jednohroby/IMG_5379.jpeg", title: "Jednohrob" },
  { id: 1041, category: "Jednohroby", image: "/jednohroby/IMG_5511.jpeg", title: "Jednohrob" },
  { id: 1042, category: "Jednohroby", image: "/jednohroby/IMG_5517.jpeg", title: "Jednohrob" },
  { id: 1043, category: "Jednohroby", image: "/jednohroby/att.kjozb7bwfdm6s6arq-cpwoutzeycrtl-jmkddcvetgk.jpg", title: "Jednohrob" },
  { id: 1044, category: "Jednohroby", image: "/jednohroby/att.thupnygarueefpdtd-83rhocnl0nrichosafq9zs2dg.jpg", title: "Jednohrob" },
  { id: 1045, category: "Jednohroby", image: "/jednohroby/fotografie0313-1.jpg", title: "Jednohrob" },
  { id: 1046, category: "Jednohroby", image: "/jednohroby/img-20211021-wa0003.1.jpg", title: "Jednohrob" },
  { id: 1047, category: "Jednohroby", image: "/jednohroby/jednohrob.jpg", title: "Jednohrob" },
  { id: 1048, category: "Jednohroby", image: "/jednohroby/jednohrob2.jpg", title: "Jednohrob" },
  { id: 1049, category: "Jednohroby", image: "/jednohroby/jednohrob3.jpg", title: "Jednohrob" },
  { id: 1050, category: "Jednohroby", image: "/jednohroby/jednohrob4.jpg", title: "Jednohrob" },
  { id: 1051, category: "Jednohroby", image: "/jednohroby/jednohrob6.jpg", title: "Jednohrob" },
  { id: 1052, category: "Jednohroby", image: "/jednohroby/pict0082.jpg", title: "Jednohrob" },
  { id: 1053, category: "Jednohroby", image: "/jednohroby/telefon103.jpg", title: "Jednohrob" },
  { id: 1054, category: "Jednohroby", image: "/jednohroby/telefon6129.jpg", title: "Jednohrob" },

  // ═══════════════════════════════════════════
  // Dvojhroby (all 78 photos)
  // ═══════════════════════════════════════════
  { id: 2000, category: "Dvojhroby", image: "/dvojhroby/20200502-152932-1.jpg", title: "Dvojhrob" },
  { id: 2001, category: "Dvojhroby", image: "/dvojhroby/20200516-181627-1.jpg", title: "Dvojhrob" },
  { id: 2002, category: "Dvojhroby", image: "/dvojhroby/20200613-132835-1.jpg", title: "Dvojhrob" },
  { id: 2003, category: "Dvojhroby", image: "/dvojhroby/20200627-174918-1.jpg", title: "Dvojhrob" },
  { id: 2004, category: "Dvojhroby", image: "/dvojhroby/20200828-150757-1.jpg", title: "Dvojhrob" },
  { id: 2005, category: "Dvojhroby", image: "/dvojhroby/20201018-151752-1.jpg", title: "Dvojhrob" },
  { id: 2006, category: "Dvojhroby", image: "/dvojhroby/20201124-153649-1.jpg", title: "Dvojhrob" },
  { id: 2007, category: "Dvojhroby", image: "/dvojhroby/20201128-133210-1.jpg", title: "Dvojhrob" },
  { id: 2008, category: "Dvojhroby", image: "/dvojhroby/20201214-143903.jpg", title: "Dvojhrob" },
  { id: 2009, category: "Dvojhroby", image: "/dvojhroby/20210430-195623.jpg", title: "Dvojhrob" },
  { id: 2010, category: "Dvojhroby", image: "/dvojhroby/20210518-202516.jpg", title: "Dvojhrob" },
  { id: 2011, category: "Dvojhroby", image: "/dvojhroby/20210528-180738-1.jpg", title: "Dvojhrob" },
  { id: 2012, category: "Dvojhroby", image: "/dvojhroby/20210529-150936-1.jpg", title: "Dvojhrob" },
  { id: 2013, category: "Dvojhroby", image: "/dvojhroby/20210710-194137-1.jpg", title: "Dvojhrob" },
  { id: 2014, category: "Dvojhroby", image: "/dvojhroby/20210717-192629.jpg", title: "Dvojhrob" },
  { id: 2015, category: "Dvojhroby", image: "/dvojhroby/20210730-164715.jpg", title: "Dvojhrob" },
  { id: 2016, category: "Dvojhroby", image: "/dvojhroby/20210730-164833.jpg", title: "Dvojhrob" },
  { id: 2017, category: "Dvojhroby", image: "/dvojhroby/20210830-185643-1.jpg", title: "Dvojhrob" },
  { id: 2019, category: "Dvojhroby", image: "/dvojhroby/20210909-194037.jpg", title: "Dvojhrob" },
  { id: 2021, category: "Dvojhroby", image: "/dvojhroby/20210926-182034.jpg", title: "Dvojhrob" },
  { id: 2022, category: "Dvojhroby", image: "/dvojhroby/20211001-172818-1.jpg", title: "Dvojhrob" },
  { id: 2023, category: "Dvojhroby", image: "/dvojhroby/20211002-164639-1.jpg", title: "Dvojhrob" },
  { id: 2024, category: "Dvojhroby", image: "/dvojhroby/20211002-164639-1664399787-1.jpg", title: "Dvojhrob" },
  { id: 2025, category: "Dvojhroby", image: "/dvojhroby/20211023-134249.jpg", title: "Dvojhrob" },
  { id: 2026, category: "Dvojhroby", image: "/dvojhroby/20211030-163454.jpg", title: "Dvojhrob" },
  { id: 2027, category: "Dvojhroby", image: "/dvojhroby/20211120-160319.jpg", title: "Dvojhrob" },
  { id: 2028, category: "Dvojhroby", image: "/dvojhroby/20211204-135553-1.jpg", title: "Dvojhrob" },
  { id: 2029, category: "Dvojhroby", image: "/dvojhroby/20211214-185559.jpg", title: "Dvojhrob" },
  { id: 2030, category: "Dvojhroby", image: "/dvojhroby/20211214-185621.jpg", title: "Dvojhrob" },
  { id: 2031, category: "Dvojhroby", image: "/dvojhroby/20220415-152807.jpg", title: "Dvojhrob" },
  { id: 2032, category: "Dvojhroby", image: "/dvojhroby/20220423-193741.jpg", title: "Dvojhrob" },
  { id: 2033, category: "Dvojhroby", image: "/dvojhroby/20220513-191357.jpg", title: "Dvojhrob" },
  { id: 2034, category: "Dvojhroby", image: "/dvojhroby/20220602-184253.jpg", title: "Dvojhrob" },
  { id: 2035, category: "Dvojhroby", image: "/dvojhroby/308357289-647848823372038-5184946103308466982-n.jpg", title: "Dvojhrob" },
  { id: 2036, category: "Dvojhroby", image: "/dvojhroby/308504725-2045723538960463-1374586035217620594-n.jpg", title: "Dvojhrob" },
  { id: 2037, category: "Dvojhroby", image: "/dvojhroby/309445733-1287972712013973-2523552876197084956-n.jpg", title: "Dvojhrob" },
  { id: 2038, category: "Dvojhroby", image: "/dvojhroby/309642415-447996520647685-6700457202616060612-n.jpg", title: "Dvojhrob" },
  { id: 2039, category: "Dvojhroby", image: "/dvojhroby/310102186-572965087915595-285259257353806045-n-1.jpg", title: "Dvojhrob" },
  { id: 2040, category: "Dvojhroby", image: "/dvojhroby/312707249-1118264612173234-2110266540879677396-n.jpg", title: "Dvojhrob" },
  { id: 2041, category: "Dvojhroby", image: "/dvojhroby/312925347-6120680207961160-953965020840752067-n.jpg", title: "Dvojhrob" },
  { id: 2042, category: "Dvojhroby", image: "/dvojhroby/312972669-529683805204463-1515582735150129543-n.jpg", title: "Dvojhrob" },
  { id: 2043, category: "Dvojhroby", image: "/dvojhroby/313743648-1078283949518935-3687998501383638337-n.jpg", title: "Dvojhrob" },
  { id: 2044, category: "Dvojhroby", image: "/dvojhroby/316525901-667840644732087-4502153996620685819-n.jpg", title: "Dvojhrob" },
  { id: 2045, category: "Dvojhroby", image: "/dvojhroby/316886082-806310760431067-4756060552343810862-n.jpg", title: "Dvojhrob" },
  { id: 2046, category: "Dvojhroby", image: "/dvojhroby/333299983-3332486873667274-5641080855173067765-n.jpg", title: "Dvojhrob" },
  { id: 2047, category: "Dvojhroby", image: "/dvojhroby/333365434-679727833900439-3442895131356571103-n.jpg", title: "Dvojhrob" },
  { id: 2048, category: "Dvojhroby", image: "/dvojhroby/333588547-673440397868378-1562773175206360536-n.jpg", title: "Dvojhrob" },
  { id: 2049, category: "Dvojhroby", image: "/dvojhroby/333705073-861950998436925-3409392369262281731-n.jpg", title: "Dvojhrob" },
  { id: 2050, category: "Dvojhroby", image: "/dvojhroby/334065020-744215993908443-1173074845715842869-n.jpg", title: "Dvojhrob" },
  { id: 2051, category: "Dvojhroby", image: "/dvojhroby/334074808-614670417147328-7262132523090681542-n.jpg", title: "Dvojhrob" },
  { id: 2052, category: "Dvojhroby", image: "/dvojhroby/335438215-1432929310789692-3504457432371794508-n.jpg", title: "Dvojhrob" },
  { id: 2053, category: "Dvojhroby", image: "/dvojhroby/335695174-1434045407400221-3810505469218598401-n.jpg", title: "Dvojhrob" },
  { id: 2054, category: "Dvojhroby", image: "/dvojhroby/370080610-1038618060590663-7691486331377047548-n.jpg", title: "Dvojhrob" },
  { id: 2055, category: "Dvojhroby", image: "/dvojhroby/395530358-187070834444024-4862103346260296158-n.jpg", title: "Dvojhrob" },
  { id: 2056, category: "Dvojhroby", image: "/dvojhroby/395540025-1391850518415710-7504601686871785659-n1.jpg", title: "Dvojhrob" },
  { id: 2057, category: "Dvojhroby", image: "/dvojhroby/396577902-291842477008602-6704988786622135055-n.jpg", title: "Dvojhrob" },
  { id: 2058, category: "Dvojhroby", image: "/dvojhroby/403403549-1389412735118409-5634335545317962002-n.jpg", title: "Dvojhrob" },
  { id: 2059, category: "Dvojhroby", image: "/dvojhroby/403411524-1073723260494436-5441012062212736660-n.jpg", title: "Dvojhrob" },
  { id: 2060, category: "Dvojhroby", image: "/dvojhroby/56deb137-cb2f-4f96-9756-d65486e4ebab.JPG", title: "Dvojhrob" },
  { id: 2061, category: "Dvojhroby", image: "/dvojhroby/IMG_5027.jpeg", title: "Dvojhrob" },
  { id: 2062, category: "Dvojhroby", image: "/dvojhroby/IMG_5032.jpeg", title: "Dvojhrob" },
  { id: 2064, category: "Dvojhroby", image: "/dvojhroby/IMG_5268.jpeg", title: "Dvojhrob" },
  { id: 2065, category: "Dvojhroby", image: "/dvojhroby/IMG_5345.jpeg", title: "Dvojhrob" },
  { id: 2066, category: "Dvojhroby", image: "/dvojhroby/att.wo4uibliigudbrhcvmcs3t7yx9yxbeahaeat1pl6zs.jpg", title: "Dvojhrob" },
  { id: 2067, category: "Dvojhroby", image: "/dvojhroby/dvojhrob1.jpg", title: "Dvojhrob" },
  { id: 2069, category: "Dvojhroby", image: "/dvojhroby/fotografie0210.jpg", title: "Dvojhrob" },
  { id: 2070, category: "Dvojhroby", image: "/dvojhroby/fotografie0212.jpg", title: "Dvojhrob" },
  { id: 2071, category: "Dvojhroby", image: "/dvojhroby/img-20170518-131216.jpg", title: "Dvojhrob" },
  { id: 2072, category: "Dvojhroby", image: "/dvojhroby/p1010067.jpg", title: "Dvojhrob" },
  { id: 2073, category: "Dvojhroby", image: "/dvojhroby/p1010129.jpg", title: "Dvojhrob" },
  { id: 2074, category: "Dvojhroby", image: "/dvojhroby/p1010178.jpg", title: "Dvojhrob" },
  { id: 2075, category: "Dvojhroby", image: "/dvojhroby/pict0036.jpg", title: "Dvojhrob" },
  { id: 2076, category: "Dvojhroby", image: "/dvojhroby/telefon055.jpg", title: "Dvojhrob" },
  { id: 2077, category: "Dvojhroby", image: "/dvojhroby/telefon081.jpg", title: "Dvojhrob" },

  // ═══════════════════════════════════════════
  // Urnové hroby (all 88 photos)
  // ═══════════════════════════════════════════
  { id: 3000, category: "Urnové hroby", image: "/urnaky/030003f7.jpg", title: "Urnový hrob" },
  { id: 3001, category: "Urnové hroby", image: "/urnaky/20190730-204826-1.jpg", title: "Urnový hrob" },
  { id: 3002, category: "Urnové hroby", image: "/urnaky/20200115-133148-1.jpg", title: "Urnový hrob" },
  { id: 3003, category: "Urnové hroby", image: "/urnaky/20200310-133819-1.jpg", title: "Urnový hrob" },
  { id: 3004, category: "Urnové hroby", image: "/urnaky/20200319-155431-1.jpg", title: "Urnový hrob" },
  { id: 3005, category: "Urnové hroby", image: "/urnaky/20200411-094809-1.jpg", title: "Urnový hrob" },
  { id: 3006, category: "Urnové hroby", image: "/urnaky/20200521-185638-1.jpg", title: "Urnový hrob" },
  { id: 3007, category: "Urnové hroby", image: "/urnaky/20200602-181804-1.jpg", title: "Urnový hrob" },
  { id: 3008, category: "Urnové hroby", image: "/urnaky/20200606-134407-1.jpg", title: "Urnový hrob" },
  { id: 3009, category: "Urnové hroby", image: "/urnaky/20200626-153954-1.jpg", title: "Urnový hrob" },
  { id: 3010, category: "Urnové hroby", image: "/urnaky/20200725-151136-1649428458-1.jpg", title: "Urnový hrob" },
  { id: 3011, category: "Urnové hroby", image: "/urnaky/20200821-170349-1649428459-1.jpg", title: "Urnový hrob" },
  { id: 3012, category: "Urnové hroby", image: "/urnaky/20200911-190328-1.jpg", title: "Urnový hrob" },
  { id: 3013, category: "Urnové hroby", image: "/urnaky/20200919-160818-2.jpg", title: "Urnový hrob" },
  { id: 3014, category: "Urnové hroby", image: "/urnaky/20201024-161443-1.jpg", title: "Urnový hrob" },
  { id: 3015, category: "Urnové hroby", image: "/urnaky/20201218-162134-1.jpg", title: "Urnový hrob" },
  { id: 3016, category: "Urnové hroby", image: "/urnaky/20201221-154804-2.jpg", title: "Urnový hrob" },
  { id: 3017, category: "Urnové hroby", image: "/urnaky/20210226-170228-1.jpg", title: "Urnový hrob" },
  { id: 3018, category: "Urnové hroby", image: "/urnaky/20210319-120243-1.jpg", title: "Urnový hrob" },
  { id: 3019, category: "Urnové hroby", image: "/urnaky/20210329-175700-1.jpg", title: "Urnový hrob" },
  { id: 3020, category: "Urnové hroby", image: "/urnaky/20210411-170539-1.jpg", title: "Urnový hrob" },
  { id: 3021, category: "Urnové hroby", image: "/urnaky/20210417-165626-1.jpg", title: "Urnový hrob" },
  { id: 3022, category: "Urnové hroby", image: "/urnaky/20210417-191157-1.jpg", title: "Urnový hrob" },
  { id: 3023, category: "Urnové hroby", image: "/urnaky/20210428-193209-1.jpg", title: "Urnový hrob" },
  { id: 3024, category: "Urnové hroby", image: "/urnaky/20210508-171831-1.jpg", title: "Urnový hrob" },
  { id: 3026, category: "Urnové hroby", image: "/urnaky/20210521-203218-1649428524-1.jpg", title: "Urnový hrob" },
  { id: 3027, category: "Urnové hroby", image: "/urnaky/20210601-134706-1.jpg", title: "Urnový hrob" },
  { id: 3028, category: "Urnové hroby", image: "/urnaky/20210601-192806-1.jpg", title: "Urnový hrob" },
  { id: 3029, category: "Urnové hroby", image: "/urnaky/20210619-103803-1.jpg", title: "Urnový hrob" },
  { id: 3030, category: "Urnové hroby", image: "/urnaky/20210625-190757-1.jpg", title: "Urnový hrob" },
  { id: 3031, category: "Urnové hroby", image: "/urnaky/20210701-193545-1.jpg", title: "Urnový hrob" },
  { id: 3032, category: "Urnové hroby", image: "/urnaky/20210703-183429-1.jpg", title: "Urnový hrob" },
  { id: 3033, category: "Urnové hroby", image: "/urnaky/20210703-202936-1.jpg", title: "Urnový hrob" },
  { id: 3034, category: "Urnové hroby", image: "/urnaky/20210804-200151-1.jpg", title: "Urnový hrob" },
  { id: 3035, category: "Urnové hroby", image: "/urnaky/20210820-195002-1.jpg", title: "Urnový hrob" },
  { id: 3036, category: "Urnové hroby", image: "/urnaky/20211015-182120-1.jpg", title: "Urnový hrob" },
  { id: 3037, category: "Urnové hroby", image: "/urnaky/20211019-191437-2.jpg", title: "Urnový hrob" },
  { id: 3038, category: "Urnové hroby", image: "/urnaky/20211028-171717-1.jpg", title: "Urnový hrob" },
  { id: 3039, category: "Urnové hroby", image: "/urnaky/20211030-133437-2.jpg", title: "Urnový hrob" },
  { id: 3040, category: "Urnové hroby", image: "/urnaky/20211112-163408-1.jpg", title: "Urnový hrob" },
  { id: 3041, category: "Urnové hroby", image: "/urnaky/20211119-193815-1.jpg", title: "Urnový hrob" },
  { id: 3042, category: "Urnové hroby", image: "/urnaky/20211217-184423-1.jpg", title: "Urnový hrob" },
  { id: 3043, category: "Urnové hroby", image: "/urnaky/20211218-145954-2.jpg", title: "Urnový hrob" },
  { id: 3044, category: "Urnové hroby", image: "/urnaky/20220407-200751-1.jpg", title: "Urnový hrob" },
  { id: 3045, category: "Urnové hroby", image: "/urnaky/20220507-133740-1.jpg", title: "Urnový hrob" },
  { id: 3046, category: "Urnové hroby", image: "/urnaky/20220526-205817-1.jpg", title: "Urnový hrob" },
  { id: 3047, category: "Urnové hroby", image: "/urnaky/20220604-143211-1.jpg", title: "Urnový hrob" },
  { id: 3048, category: "Urnové hroby", image: "/urnaky/20220608-204446-1.jpg", title: "Urnový hrob" },
  { id: 3049, category: "Urnové hroby", image: "/urnaky/307502864-1070784470299732-5381659573523260095-n.jpg", title: "Urnový hrob" },
  { id: 3050, category: "Urnové hroby", image: "/urnaky/308214996-489282039504928-1908264424125393593-n.jpg", title: "Urnový hrob" },
  { id: 3051, category: "Urnové hroby", image: "/urnaky/309059172-504052701137849-5580819311118841471-n.jpg", title: "Urnový hrob" },
  { id: 3052, category: "Urnové hroby", image: "/urnaky/309173275-641589033970989-2739297646546358783-n.jpg", title: "Urnový hrob" },
  { id: 3053, category: "Urnové hroby", image: "/urnaky/309412581-1149195429279253-2922318180142683176-n.jpg", title: "Urnový hrob" },
  { id: 3054, category: "Urnové hroby", image: "/urnaky/312551828-489188276499222-431187543059411983-n.jpg", title: "Urnový hrob" },
  { id: 3055, category: "Urnové hroby", image: "/urnaky/312565881-2117806451741066-2796536565252951647-n.jpg", title: "Urnový hrob" },
  { id: 3056, category: "Urnové hroby", image: "/urnaky/312832522-1811323645910112-8125888625629647590-n.jpg", title: "Urnový hrob" },
  { id: 3057, category: "Urnové hroby", image: "/urnaky/312840319-502246215139847-1384201443602473420-n.jpg", title: "Urnový hrob" },
  { id: 3058, category: "Urnové hroby", image: "/urnaky/312876867-457025406546168-4814708649825194220-n.jpg", title: "Urnový hrob" },
  { id: 3059, category: "Urnové hroby", image: "/urnaky/313117281-3197397267192115-3196113404137739251-n.jpg", title: "Urnový hrob" },
  { id: 3060, category: "Urnové hroby", image: "/urnaky/313432324-610611294146406-3637566350668219417-n.jpg", title: "Urnový hrob" },
  { id: 3061, category: "Urnové hroby", image: "/urnaky/333904955-572242764964241-2887107657605392574-n.jpg", title: "Urnový hrob" },
  { id: 3062, category: "Urnové hroby", image: "/urnaky/342195452-621497573170914-5472152269621660007-n.jpg", title: "Urnový hrob" },
  { id: 3063, category: "Urnové hroby", image: "/urnaky/342252020-791404802316033-744411253227914224-n.jpg", title: "Urnový hrob" },
  { id: 3064, category: "Urnové hroby", image: "/urnaky/342591280-1168260691241814-5340229412809585526-n.jpg", title: "Urnový hrob" },
  { id: 3065, category: "Urnové hroby", image: "/urnaky/342791397-187953237501158-1297731388823249823-n.jpg", title: "Urnový hrob" },
  { id: 3066, category: "Urnové hroby", image: "/urnaky/343958846-761266922222540-2021632237894828-n.jpg", title: "Urnový hrob" },
  { id: 3067, category: "Urnové hroby", image: "/urnaky/349624188-1442134036605646-2632543709443930962-n.jpg", title: "Urnový hrob" },
  { id: 3068, category: "Urnové hroby", image: "/urnaky/362504142-260002813443549-8182877895045457440-n.jpg", title: "Urnový hrob" },
  { id: 3069, category: "Urnové hroby", image: "/urnaky/363047933-766440868819815-2157877979892204543-n.jpg", title: "Urnový hrob" },
  { id: 3070, category: "Urnové hroby", image: "/urnaky/386870929-753737723441483-9217590286617327956-n.jpg", title: "Urnový hrob" },
  { id: 3071, category: "Urnové hroby", image: "/urnaky/403403593-694997742605710-2785439401994476348-n.jpg", title: "Urnový hrob" },
  { id: 3072, category: "Urnové hroby", image: "/urnaky/403415633-165124569991871-4993450458645886210-n.jpg", title: "Urnový hrob" },
  { id: 3073, category: "Urnové hroby", image: "/urnaky/IMG_5248.jpeg", title: "Urnový hrob" },
  { id: 3076, category: "Urnové hroby", image: "/urnaky/IMG_5491.jpeg", title: "Urnový hrob" },
  { id: 3077, category: "Urnové hroby", image: "/urnaky/att.aiycii7foitmimt6xlrpou7sjr2owjqv4wewdwqd-l4.jpg", title: "Urnový hrob" },
  { id: 3078, category: "Urnové hroby", image: "/urnaky/att.g8ycw-qpepkgou-anhxckybs4hhalf2somzdsawmgcw.jpg", title: "Urnový hrob" },
  { id: 3079, category: "Urnové hroby", image: "/urnaky/att.lzdupmkdgupp37thzxy-vkszhaeoqe-20xjakr6tkn8.jpg", title: "Urnový hrob" },
  { id: 3080, category: "Urnové hroby", image: "/urnaky/att.s-kyfhkcitcdcvibdgayz5u2-hqhbgj8c9xrztixvq.jpg", title: "Urnový hrob" },
  { id: 3081, category: "Urnové hroby", image: "/urnaky/att.srsr89oetgeflakisewp9bulofdnv0eisobh4qk9i8u.jpg", title: "Urnový hrob" },
  { id: 3082, category: "Urnové hroby", image: "/urnaky/att.wgayv6dlvnivf9yldp3wz6qxpe928zczktvzjv4ekdi.jpg", title: "Urnový hrob" },
  { id: 3083, category: "Urnové hroby", image: "/urnaky/att.zi05hmwrv0mjkjrc-7nfgo9ozdimbrb6ibbqabuni0.jpg", title: "Urnový hrob" },
  { id: 3084, category: "Urnové hroby", image: "/urnaky/img-20181117-134959.jpg", title: "Urnový hrob" },
  { id: 3086, category: "Urnové hroby", image: "/urnaky/screenshot-20200908-173340-gallery.jpg", title: "Urnový hrob" },
  { id: 3087, category: "Urnové hroby", image: "/urnaky/urnak2-1713457955.jpg", title: "Urnový hrob" },

  // Renovace
  { id: 2068, category: "Renovace", image: "/dvojhroby/dvojhrob3.jpg", title: "Renovace" },
  { id: 6000, category: "Renovace", image: "/renovace/att.ix4mi2h9yvozdq11s-vcukfhrh4-l1oj06hwqliw41a.jpg", title: "Renovace" },
  { id: 6001, category: "Renovace", image: "/renovace/att.l6qxx8k26vztrr6rhnghi-iclyyp0pkztxsq66iaoyu.jpg", title: "Renovace" },
  { id: 6002, category: "Renovace", image: "/renovace/att.uzgxzzrcs62vr5vjh2d3w2sorwfg4isjzqo0gp6q5-k.jpg", title: "Renovace" },
  { id: 6003, category: "Renovace", image: "/renovace/att.velyeov6sd8-zwyjzvlcejh-ggafnjdmpsivo-5vyf4.jpg", title: "Renovace" },
  { id: 6004, category: "Renovace", image: "/renovace/att.zaoavddbufqzygbyvf6bsasurq4jmze5s1wbarj1keg.jpg", title: "Renovace" },

  // Litinové kříže
  { id: 7000, category: "Litinové a kamenné kříže", image: "/litenne-krize/20200903-190605.jpg", title: "Litinový / kamenný kříž" },
  { id: 7001, category: "Litinové a kamenné kříže", image: "/litenne-krize/img-20170710-164447-effects.jpg", title: "Litinový / kamenný kříž" },
  { id: 7002, category: "Litinové a kamenné kříže", image: "/litenne-krize/img-20170815-201136.jpg", title: "Litinový / kamenný kříž" },
  { id: 7003, category: "Litinové a kamenné kříže", image: "/litenne-krize/img-20170817-105353.jpg", title: "Litinový / kamenný kříž" },
  { id: 7004, category: "Litinové a kamenné kříže", image: "/litenne-krize/img-20181004-170835.jpg", title: "Litinový / kamenný kříž" },
  { id: 7005, category: "Litinové a kamenné kříže", image: "/litenne-krize/img-20181021-172354.jpg", title: "Litinový / kamenný kříž" },
  { id: 7006, category: "Litinové a kamenné kříže", image: "/litenne-krize/img-20181110-145702.jpg", title: "Litinový / kamenný kříž" },

  // Gravírování
  { id: 8000, category: "Gravírování", image: "/glavirovani/490853260-1184844670319047-6096504186626387201-n.jpg", title: "Gravírování" },
  { id: 8001, category: "Gravírování", image: "/glavirovani/img-3618.jpg", title: "Gravírování" },
  { id: 8002, category: "Gravírování", image: "/glavirovani/img-4119.jpg", title: "Gravírování" },
  { id: 8003, category: "Gravírování", image: "/glavirovani/img-4148.jpg", title: "Gravírování" },
  { id: 8004, category: "Gravírování", image: "/glavirovani/img-4169.jpg", title: "Gravírování" },
  { id: 8005, category: "Gravírování", image: "/glavirovani/img-4296.jpg", title: "Gravírování" },
  { id: 8006, category: "Gravírování", image: "/glavirovani/img-4301.jpg", title: "Gravírování" },
  { id: 8007, category: "Gravírování", image: "/glavirovani/img-4306.jpg", title: "Gravírování" },
  { id: 8008, category: "Gravírování", image: "/glavirovani/img-4315.jpg", title: "Gravírování" },
  { id: 8009, category: "Gravírování", image: "/glavirovani/img-4316.jpg", title: "Gravírování" },
]

const categories = ["Vše", "Urnové hroby", "Jednohroby", "Dvojhroby", "Památníky", "Kuchyňské desky", "Schody a parapety", "Renovace", "Litinové a kamenné kříže", "Gravírování"]

function RealizationsContent() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get("cat")
  const initialFilter = catParam && categories.includes(catParam) ? catParam : "Vše"

  const [filter, setFilter] = useState(initialFilter)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (catParam && categories.includes(catParam)) {
      setFilter(catParam)
      setLightboxIndex(null)
    }
  }, [catParam])

  const numberedProjects = useMemo(() => {
    const counters: Record<string, number> = {}
    return projects.map((project) => {
      counters[project.category] = (counters[project.category] || 0) + 1
      return { ...project, number: counters[project.category] }
    })
  }, [])

  const filteredProjects = useMemo(
    () => numberedProjects.filter(p => filter === "Vše" ? true : p.category === filter),
    [numberedProjects, filter]
  )

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    setZoomed(false)
  }, [])

  const showPrev = useCallback(() => {
    setZoomed(false)
    setLightboxIndex(i => i === null ? null : (i - 1 + filteredProjects.length) % filteredProjects.length)
  }, [filteredProjects.length])

  const showNext = useCallback(() => {
    setZoomed(false)
    setLightboxIndex(i => i === null ? null : (i + 1) % filteredProjects.length)
  }, [filteredProjects.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      else if (e.key === "ArrowLeft") showPrev()
      else if (e.key === "ArrowRight") showNext()
      else if (e.key === "+" || e.key === "=") setZoomed(true)
      else if (e.key === "-") setZoomed(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  useEffect(() => {
    if (lightboxIndex === null) return
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [lightboxIndex])

  const selectedProject = lightboxIndex !== null ? filteredProjects[lightboxIndex] : null

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Naše Realizace</h1>
          <p className="font-body text-xl text-stone-600">Prohlédněte si ukázky naší práce.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all duration-300 font-body",
                  filter === cat 
                    ? "bg-accent text-white shadow-md transform scale-105" 
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="group relative overflow-hidden rounded-sm shadow-sm cursor-pointer"
                  onClick={() => { setLightboxIndex(index); setZoomed(false) }}
                >
                  <div className="aspect-[4/3] bg-stone-200 relative">
                     <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${project.image}')` }}
                     />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                     <span className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold font-body px-2.5 py-1 rounded-full shadow-md">
                        #{project.number}
                     </span>

                     <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-accent text-sm font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                        <h3 className="text-white font-heading text-xl font-bold">{project.title} #{project.number}</h3>
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          >
            {/* Top bar: counter + close */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white font-body text-sm">
                <span className="text-accent font-bold">{selectedProject.category}</span>
                <span className="text-stone-400">·</span>
                <span>#{selectedProject.number}</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-300">{lightboxIndex! + 1} / {filteredProjects.length}</span>
              </div>
              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setZoomed(z => !z) }}
                  aria-label={zoomed ? "Oddálit" : "Přiblížit"}
                  className="text-white hover:text-accent transition-colors bg-black/50 hover:bg-black/80 rounded-full p-2"
                >
                  {zoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); closeLightbox() }}
                  aria-label="Zavřít"
                  className="text-white hover:text-accent transition-colors bg-black/50 hover:bg-black/80 rounded-full p-2"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Prev arrow */}
            {filteredProjects.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); showPrev() }}
                aria-label="Předchozí fotografie"
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 text-white hover:text-accent transition-colors bg-black/50 hover:bg-black/80 rounded-full p-2 md:p-3"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Next arrow */}
            {filteredProjects.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); showNext() }}
                aria-label="Další fotografie"
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 text-white hover:text-accent transition-colors bg-black/50 hover:bg-black/80 rounded-full p-2 md:p-3"
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Image area */}
            <motion.div
              key={selectedProject.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative max-w-6xl max-h-[90vh] flex items-center justify-center bg-transparent",
                zoomed ? "overflow-auto w-full h-full" : "overflow-hidden"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} #${selectedProject.number}`}
                onClick={() => setZoomed(z => !z)}
                className={cn(
                  "rounded-md shadow-2xl transition-transform duration-300 select-none",
                  zoomed
                    ? "max-w-none max-h-none w-auto h-auto scale-[2] cursor-zoom-out origin-center"
                    : "max-w-full max-h-[85vh] object-contain cursor-zoom-in"
                )}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function RealizationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-500">Načítání…</div>}>
      <RealizationsContent />
    </Suspense>
  )
}
