describe('bmp.js', function () {

  beforeEach(module('bmpSamples'));

  it('should read / write simple BMP files correctly', inject(function (red_square) {
    var parsed = bmp.parse(red_square);
    // Reads header
    expect(parsed.data.header).toEqual({
      "file": {
        "header": "BM",
        "size": 374,
        "data_offset": 54
      },
      "dib": {
        "dib_size": 40,
        "width": 10,
        "height": 10,
        "num_color_planes": 1,
        "bits_per_pixel": 24,
        "compression_method_code": 0,
        "image_size": 0,
        "horizontal_resolution": 0,
        "vertical_resolution": 0,
        "colors_in_palette": 0
      }
    });
    // Reads pixels
    expect(parsed.data.lines.length).toEqual(10);
    expect(parsed.data.lines[0].length).toEqual(10);
    expect(parsed.data.lines[0].length).toEqual(10);
    expect(parsed.data.lines[0][0]).toEqual(255);
    // Writes properly
    expect(bmp.unparse(parsed.data).data).toEqual(red_square);
  }));

});
