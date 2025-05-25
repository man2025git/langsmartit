<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $click_x = $_POST["x"];
  $click_y = $_POST["y"];

  // หรือถ้าคุณตั้งชื่อ name="map_coords"
  // $click_x = $_POST["map_coords_x"];
  // $click_y = $_POST["map_coords_y"];

  // ใช้ $click_x และ $click_y เพื่อระบุตำแหน่งบนแผนที่และดำเนินการ
  echo "คุณคลิกที่พิกัด X: " . $click_x . ", Y: " . $click_y;
  // ... โค้ดประมวลผลอื่นๆ ...
}
?>