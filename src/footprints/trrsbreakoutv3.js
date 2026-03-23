// TRRS Audio Jack Breakout Module
// Board size: 19mm wide x 15mm tall
//
// Actual layout (from photo):
//
//                  NC   NC
//                   o    o       <- top edge
//
//  S  o
//  R2 o    [ JACK -> ]           <- jack faces right
//  R1 o
//  TIP o
//
//                   o    o       <- bottom edge
//                  NC   NC
//
// 4-pin header on LEFT at x = -7.5 (vertical, 2.54mm pitch)
// NC pins on TOP/BOTTOM edges, 10mm from center of 4-pin header
// x: -9.5 to +9.5  (19mm wide)
// y: -7.5 to +7.5  (15mm tall)

module.exports = {
  params: {
    designator: 'TRRS',
    TIP: undefined,
    R1:  undefined,
    R2:  undefined,
    S:   undefined,
    NC_T1: undefined,
    NC_T2: undefined,
    NC_B1: undefined,
    NC_B2: undefined,
  },
  body: p => `
    (module trrs_breakout (layer F.Cu) (tedit 00000001)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 -9) (layer F.SilkS)
        ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
      (fp_text value "TRRS_Breakout" (at 0 9) (layer F.Fab)
        (effects (font (size 1 1) (thickness 0.15))))

      ${'' /* Board outline: 19mm wide x 15mm tall
           x: -9.5 to +9.5
           y: -7.5 to +7.5 */}
      (fp_line (start -9.5 -7.5) (end  9.5 -7.5) (layer F.Fab) (width 0.12))
      (fp_line (start  9.5 -7.5) (end  9.5  7.5) (layer F.Fab) (width 0.12))
      (fp_line (start  9.5  7.5) (end -9.5  7.5) (layer F.Fab) (width 0.12))
      (fp_line (start -9.5  7.5) (end -9.5 -7.5) (layer F.Fab) (width 0.12))

      ${'' /* Courtyard */}
      (fp_line (start -10 -8) (end  10 -8) (layer F.CrtYd) (width 0.05))
      (fp_line (start  10 -8) (end  10  8) (layer F.CrtYd) (width 0.05))
      (fp_line (start  10  8) (end -10  8) (layer F.CrtYd) (width 0.05))
      (fp_line (start -10  8) (end -10 -8) (layer F.CrtYd) (width 0.05))

      ${'' /* SilkS outline */}
      (fp_line (start -9.5 -7.5) (end  9.5 -7.5) (layer F.SilkS) (width 0.12))
      (fp_line (start  9.5 -7.5) (end  9.5  7.5) (layer F.SilkS) (width 0.12))
      (fp_line (start  9.5  7.5) (end -9.5  7.5) (layer F.SilkS) (width 0.12))
      (fp_line (start -9.5  7.5) (end -9.5 -7.5) (layer F.SilkS) (width 0.12))

      ${'' /* =============================================
           LEFT HEADER: 4 pins (S, R2, R1, TIP)
           Vertical, 2.54mm pitch
           x = -7.5 (near left edge)
           S at top, TIP at bottom
           Y positions: -3.81, -1.27, +1.27, +3.81
           ============================================= */}

      (pad S   thru_hole rect   (at -7.5 -3.81 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.S})
      (pad R2  thru_hole circle (at -7.5 -1.27 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.R2})
      (pad R1  thru_hole circle (at -7.5  1.27 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.R1})
      (pad TIP thru_hole circle (at -7.5  3.81 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.TIP})

      ${'' /* =============================================
           TOP/BOTTOM NC PINS
           4-pin header center x = -7.5
           10mm to the right = x = +2.5 (nearest NC pin)
           2nd NC pin at x = +2.5 + 2.54 = +5.04
           Top: y = -6.0, Bottom: y = +6.0
           ============================================= */}

      (pad NC_T1 thru_hole rect   (at  3.0  -6.5 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.NC_T1})
      (pad NC_T2 thru_hole circle (at  5.54 -6.5 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.NC_T2})

      (pad NC_B1 thru_hole rect   (at  3.0   6.5 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.NC_B1})
      (pad NC_B2 thru_hole circle (at  5.54  6.5 ${p.r}) (size 1.7 1.7) (drill 1.0) (layers *.Cu *.Mask) ${p.NC_B2})
    )
  `
}