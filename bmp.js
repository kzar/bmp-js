/*global bitratchet*/

var bmp;

(function () {
  "use strict";

  function line (options) {
    var padding_length = 32 - (options.bits_per_pixel * options.width) % 32,
        line_parts = bitratchet.record({
          pixels: bitratchet.array({
            size: options.width,
            type: bitratchet.number({ length: options.bits_per_pixel })
          }),
          padding: bitratchet.skip({ length: padding_length })
        });

    return {
      parse: function (data) {
        var parts = line_parts.parse(data).data;
        return parts.pixels;
      },
      unparse: function (data) {
        return line_parts.unparse({
          pixels: data
        });
      },
      length: options.bits_per_pixel * options.width + padding_length
    };
  }

  bmp = bitratchet.record({
    header: bitratchet.record({
      file: bitratchet.record({
        header: bitratchet.string({ length: 2 * 8, endian: 'little' }),
        size: bitratchet.number({ length: 4 * 8, endian: 'little' }),
        reserved: bitratchet.skip({ length: 4 * 8 }),
        data_offset: bitratchet.number({ length: 4 * 8, endian: 'little' })
      }),
      // FIXME implement all 5 variations of dib header
      dib: bitratchet.record({
        dib_size: bitratchet.number({ length: 4 * 8, endian: 'little' }),
        width: bitratchet.number({ length: 4 * 8, signed: true, endian: 'little' }),
        height: bitratchet.number({ length: 4 * 8, signed: true, endian: 'little' }),
        num_color_planes: bitratchet.number({ length: 2 * 8, endian: 'little' }),
        bits_per_pixel: bitratchet.number({ length: 2 * 8, endian: 'little' }),
        compression_method_code: bitratchet.number({ length: 4 * 8, endian: 'little' }),
        image_size: bitratchet.number({ length: 4 * 8, endian: 'little' }),
        horizontal_resolution: bitratchet.number({ length: 4 * 8, signed: true, endian: 'little' }),
        vertical_resolution: bitratchet.number({ length: 4 * 8, signed: true, endian: 'little' }),
        colors_in_palette: bitratchet.number({ length: 4 * 8, endian: 'little' }),
        ignored: bitratchet.skip({ length: 4 * 8, endian: 'little' })
      })
      // FIXME what about colour palette? (If <24 bits per pixel there should be one)
    }),
    lines: function (state, record) {
      return bitratchet.array({
        size: record.header.dib.height,
        type: line({ width: record.header.dib.width, bits_per_pixel: record.header.dib.bits_per_pixel })
      });
    }
  });

}());
