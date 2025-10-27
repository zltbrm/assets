
(function () {
    'use strict';

    const ASSET_BASE_URL = 'https://raw.githubusercontent.com/zltbrm/assets/master/';

    // 地图数据（从JSON提取）
    const mapData = { "compressionlevel": -1, "height": 50, "infinite": false, "layers": [{ "compression": "", "data": "xQoAAMUKAADFCgAAxQoAAMQKAADECgAAxAoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAAxQoAAMUKAADVCgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxQoAAMYKAADVCgAA1QoAAMQKAADECgAA1AoAANQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAA1AoAANQKAADUCgAAxAoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxAoAAMQKAADFCgAA1QoAANUKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAAMQKAADECgAAxQoAAMQKAADECgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAAMQKAADFCgAAxQoAAMUKAADFCgAAxQoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADECgAAxQoAAMUKAADFCgAA1QoAAMUKAADFCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADECgAAxAoAAMQKAADFCgAAxAoAAMUKAADFCgAA1AoAAMQKAADFCgAAxQoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAAxQoAAMUKAADVCgAA1QoAANUKAADVCgAAxQoAAMQKAADECgAA1AoAANQKAADUCgAA1QoAAMUKAADFCgAA1QoAANUKAADVCgAA1QoAANUKAADFCgAAxQoAAMUKAADFCgAAxQoAANUKAADVCgAAxAoAAMQKAADECgAAxAoAAMUKAADFCgAAxQoAAMUKAADECgAAxQoAANUKAADECgAAxAoAAMQKAADECgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxQoAANQKAADUCgAA1QoAAMQKAADFCgAAxQoAAMUKAADFCgAAxQoAANQKAADUCgAA1QoAANUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAANUKAADVCgAA1QoAAMUKAADFCgAAxgoAANQKAADUCgAA1AoAANQKAADVCgAAxgoAAMYKAADGCgAAxgoAAMYKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADVCgAA1AoAANUKAADFCgAAxQoAAMUKAADVCgAA1QoAANUKAADVCgAA1AoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADGCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADGCgAA1goAANYKAADGCgAAxgoAAMYKAADGCgAAxgoAAMYKAADGCgAAxgoAANQKAADVCgAA1QoAANUKAADVCgAA1QoAAMYKAADGCgAAxgoAAMYKAADGCgAAxgoAAMYKAADGCgAAxgoAAMYKAADGCgAAxgoAANQKAADVCgAA1QoAANUKAADVCgAA1QoAAMYKAADGCgAAxgoAAMYKAADGCgAAxgoAAMYKAADECgAAxQoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANYKAADVCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAANYKAADWCgAA1goAAMQKAADFCgAAxQoAAMUKAADGCgAAAwMAAAQDAAADAwAABAMAAAMDAAAEAwAAAwMAAAQDAAADAwAABAMAAAMDAAAEAwAAAwMAAAQDAAADAwAABAMAAH0KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH0KAAB+CgAAxQoAAMQKAADFCgAAxAoAAMUKAADVCgAAxQoAAMYKAAATAwAAFAMAABMDAAAUAwAAEwMAABQDAAATAwAAFAMAABMDAAAUAwAAEwMAABQDAAATAwAAFAMAABMDAAAUAwAAjQoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjQoAAI4KAADECgAA1AoAANUKAADECgAAxAoAAMUKAADFCgAAxgoAAAMDAAAEAwAAfQoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB9CgAAfgoAAAMDAAAEAwAAAwMAAAQDAABFAAAARQAAAEYAAAAxAAAAMgAAADIAAABFAAAAMQAAADEAAAAxAAAAMQAAADIAAABGAAAAMQAAADIAAABFAAAAhwoAAIgKAAB9CgAAfgoAANQKAADUCgAA1QoAANQKAADECgAAxQoAAMUKAADGCgAAEwMAABQDAACNCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI0KAACOCgAAEwMAABQDAAATAwAAFAMAAEUAAABGAAAAMQAAADEAAAAyAAAAMQAAADIAAAAxAAAAMgAAAEUAAAAxAAAAMQAAADEAAAAyAAAAMgAAADIAAACXCgAAmAoAAI0KAACOCgAAxQoAANQKAADVCgAAxAoAAMUKAADFCgAAxQoAAMYKAAB9CgAAfgoAAEYAAABGAAAAMQAAADIAAAAxAAAAMgAAADIAAABFAAAARgAAADIAAAADAwAABAMAAAMDAAAEAwAAAwMAAAQDAAADAwAABAMAAEUAAABGAAAARQAAAEYAAAD5CgAA+goAAPsKAAD8CgAABQMAAAYDAAD5CgAA+goAAPsKAAD8CgAAMQAAADIAAAD5CgAA+goAAPsKAAD8CgAAfQoAAH4KAADFCgAA1AoAANUKAADECgAAxQoAAMUKAADGCgAAxgoAAI0KAACOCgAARQAAAEYAAAAyAAAARgAAADEAAAAyAAAARgAAAEUAAABGAAAARgAAABMDAAAUAwAAEwMAABQDAAATAwAAFAMAABMDAAAUAwAARQAAAEYAAABFAAAARgAAAAkLAAAKCwAACwsAAAwLAAAVAwAAFgMAAAkLAAAKCwAACwsAAAwLAAAxAAAAMQAAAAkLAAAKCwAACwsAAAwLAACNCgAAjgoAAMUKAADUCgAA1QoAAMQKAADFCgAAxQoAAMYKAADWCgAAfQoAAH4KAABFAAAARgAAAEYAAAAxAAAAMgAAADEAAAAxAAAAMgAAADEAAAAyAAAAMgAAAEYAAAAxAAAAMQAAAEUAAABGAAAARgAAAEUAAABGAAAAMQAAAMQKAADFCgAAPQsAAD4LAAAbCwAAHAsAADIAAABFAAAAQwsAAEQLAAAjCwAAJAsAADEAAABFAAAAQwsAAEQLAABBCwAAQgsAAH0KAAB+CgAAxQoAANQKAADVCgAAxAoAAMQKAADECgAAxQoAAMUKAACNCgAAjgoAAEUAAABGAAAAMgAAADIAAAAyAAAARQAAADEAAAAxAAAAMgAAADIAAABGAAAARgAAADIAAAAxAAAAMQAAAEUAAABGAAAARQAAAEYAAABFAAAA1AoAANUKAABNCwAATgsAACsLAAAsCwAAMQAAADEAAABTCwAAVAsAADMLAAA0CwAAMQAAAEUAAABTCwAAVAsAAFELAABSCwAAjQoAAI4KAADECgAA1AoAANUKAADUCgAA1AoAAMQKAADFCgAA1QoAAH0KAAB+CgAAMQAAADEAAAAxAAAAMgAAADEAAABFAAAARQAAADEAAAA\/CgAAQAoAAPkKAAD6CgAA+woAAPwKAAA\/CgAAQAoAAMQKAADFCgAAXAIAAMQKAADECgAAxAoAAMQKAADECgAAxQoAAFwCAABFAAAARQAAAEUAAAAxAAAARQAAAEUAAABFAAAARQAAAEYAAABFAAAAMQAAADEAAAB9CgAAfgoAANQKAADUCgAA1QoAANQKAADUCgAAxAoAAMUKAADGCgAAjQoAAI4KAAAxAAAAMQAAADEAAAAxAAAARQAAAEUAAABGAAAARQAAAE8KAABQCgAACQsAAAoLAAALCwAADAsAAE8KAABQCgAAxQoAAMQKAADECgAA1AoAANQKAADUCgAA1AoAAMQKAADECgAAxQoAAEUAAABFAAAARQAAAEUAAABFAAAARgAAAEYAAAAyAAAARQAAAEUAAABFAAAAMQAAAI0KAACOCgAA1AoAANUKAADECgAA1AoAANUKAADECgAAxQoAAMYKAAB9CgAAfgoAAEUAAABFAAAARQAAAEUAAABFAAAARgAAAEUAAABFAAAAPwoAAEAKAAA7CwAAPAsAABsLAAAcCwAAPwoAAEAKAADECgAAxQoAAMQKAADECgAAxAoAAMUKAADFCgAA1AoAANQKAADVCgAAxAoAAMUKAAADAwAABAMAADkKAAA6CgAARgAAAEYAAAA5CgAAOgoAAAMDAAAEAwAAfQoAAH4KAADUCgAAxAoAAMUKAADUCgAA1QoAAMQKAADFCgAAxgoAAI0KAACOCgAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAABPCgAAUAoAAEsLAABMCwAAKwsAACwLAABPCgAAUAoAAMQKAADFCgAA1AoAANQKAADUCgAA1QoAANUKAADUCgAAxAoAAMUKAADUCgAA1QoAABMDAAAUAwAASQoAAEoKAAAyAAAAMgAAAEkKAABKCgAAEwMAABQDAACNCgAAjgoAANQKAADUCgAA1QoAAMQKAADFCgAAxAoAAMUKAADWCgAAfQoAAH4KAAAxAAAAPwoAAD8KAABACgAA+QoAAPoKAAD7CgAA\/AoAADEAAAAxAAAAMQAAADEAAAA\/CgAAQAoAAMUKAADFCgAA1AoAANUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAOQoAADoKAABbAgAAXAIAAFwCAABcAgAAXAIAAFwCAAA5CgAAOgoAAH0KAAB+CgAA1AoAANUKAADVCgAAxAoAAMUKAADECgAAxAoAAMUKAACNCgAAjgoAAEUAAABPCgAATwoAAFAKAAAJCwAACgsAAAsLAAAMCwAAMQAAADIAAAAyAAAAMgAAAE8KAABQCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAABJCgAASgoAAGsCAABsAgAAbAIAAGwCAABsAgAAbAIAAEkKAABKCgAAjQoAAI4KAADECgAAxQoAANUKAADECgAAxQoAAMQKAADECgAAxQoAAH0KAAB+CgAAMQAAADEAAAA\/CgAAQAoAABkLAAAaCwAAGwsAABwLAAAxAAAAMQAAADEAAAAxAAAAPwoAAEAKAAAFAwAABQMAAAUDAAAFAwAABQMAAAUDAADEBgAAxQYAAMQKAADFCgAABQMAAAYDAAADAwAABAMAALkJAAC6CQAAuwkAALsJAAC8CQAAugkAALsJAAC8CQAAvQkAAL4JAAB9CgAAfgoAAMQKAADECgAAxQoAAMQKAADFCgAAxAoAAMQKAADFCgAAjQoAAI4KAABFAAAARQAAAE8KAABQCgAAKQsAACoLAAArCwAALAsAAEAKAABFAAAARQAAAEUAAABPCgAAUAoAABUDAAAVAwAAFQMAABUDAAAVAwAAFQMAANQGAADVBgAA1AoAANUKAAAVAwAAFgMAABMDAAAUAwAAyQkAAMoJAADLCQAAywkAAMwJAADKCQAAywkAAMwJAADNCQAAzgkAAI0KAACOCgAA1AoAAMQKAADFCgAAxQoAANUKAADECgAAxAoAAMUKAAB9CgAAfgoAADIAAAAxAAAAMgAAADEAAAAyAAAAMQAAADIAAABPCgAAUAoAADEAAAA\/CgAAQAoAAAYDAAAFAwAABgMAAAYDAAAGAwAABgMAAH0KAAB+CgAAewoAAHwKAADECgAAxQoAAHsKAAB8CgAAAwMAAAQDAAAlAwAAJgMAANsJAADcCQAA3AkAANsJAADbCQAA3AkAAH0KAAB+CgAAfQoAAH4KAADECgAAxAoAAMUKAADFCgAAxQoAAMQKAADECgAAxQoAAI0KAACOCgAARgAAAEUAAABGAAAARQAAAEYAAABFAAAARgAAAEUAAABGAAAARQAAAE8KAABQCgAAFgMAABUDAAAWAwAAFgMAABYDAAAWAwAAjQoAAI4KAACLCgAAjAoAANQKAADVCgAAiwoAAIwKAAATAwAAFAMAADUDAAA2AwAA2wkAANwJAADsCQAA2wkAANsJAADcCQAAjQoAAI4KAACNCgAAjgoAANQKAADECgAAxQoAAMQKAADFCgAAxAoAAMQKAADFCgAAfQoAAH4KAADECgAAxAoAAMQKAADFCgAA+QoAAPoKAAD7CgAA\/AoAADIAAAAxAAAA\/QoAAP4KAAD\/CgAAAAsAAAELAAACCwAAgQYAAIIGAAB9CgAAfgoAAH8KAACACgAAfwoAAIAKAAB\/CgAAgAoAAH8KAACACgAAOQoAADoKAADbCQAA2wkAANwJAADbCQAA2wkAANwJAAA5CgAAOgoAAH0KAAB+CgAA1AoAAMQKAADFCgAA1AoAANUKAADECgAAxAoAAMUKAACNCgAAjgoAANQKAADUCgAA1AoAANUKAAAJCwAACgsAAAsLAAAMCwAAPwoAAEAKAAANCwAADgsAAA8LAAAQCwAAEQsAABILAACRBgAAkgYAAI0KAACOCgAAjwoAAJAKAACPCgAAkAoAAI8KAACQCgAAjwoAAJAKAABJCgAASgoAAOsJAADrCQAA7AkAAOsJAADrCQAA7AkAAEkKAABKCgAAjQoAAI4KAADUCgAAxAoAAMUKAADUCgAA1QoAAMQKAADECgAAxQoAAH0KAAB+CgAAfQoAAH4KAADECgAAxQoAADkLAAA6CwAAGwsAABwLAABPCgAAUAoAAB0LAAAeCwAAHwsAACALAAAhCwAAIgsAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAAAdCgAAHgoAALkJAAC6CQAA2wkAAOsJAADsCQAA7AkAAOwJAADsCQAAvQkAAL4JAAB9CgAAfgoAANQKAADUCgAA1QoAANQKAADVCgAA1AoAAMQKAADFCgAAjQoAAI4KAACNCgAAjgoAANQKAADVCgAASQsAAEoLAAArCwAALAsAAD8KAABACgAALQsAAC4LAAAvCwAAMAsAADELAAAyCwAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAAC0KAAAuCgAAyQkAAMoJAADrCQAA7AkAAOwJAADrCQAA7AkAAOwJAADNCQAAzgkAAI0KAACOCgAA1AoAANUKAADGCgAA1AoAANUKAADGCgAAxAoAAMUKAAB9CgAAfgoAANkKAADaCgAAxgoAAMQKAADFCgAAxAoAAMQKAADFCgAAQAoAAEAKAAA9CwAAPgsAAD8LAABACwAAQQsAAEILAACBBgAAggYAAMQKAADECgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAHQoAAB4KAAAdCgAAHgoAAB0KAAAeCgAAHQoAAB4KAAAdCgAAHgoAAB0KAAAeCgAAfQoAAH4KAADUCgAA1QoAAMYKAADUCgAA1QoAAMYKAADECgAAxQoAAI0KAACOCgAA6QoAAOoKAADGCgAA1AoAANUKAADUCgAA1AoAANUKAABQCgAAUAoAAE0LAABOCwAATwsAAFALAABRCwAAUgsAAJEGAACSBgAA1AoAANQKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAAAtCgAALgoAAC0KAAAuCgAALQoAAC4KAAAtCgAALgoAAC0KAAAuCgAALQoAAC4KAACNCgAAjgoAANQKAADVCgAAxgoAANQKAADVCgAAxgoAAMQKAADFCgAAfQoAAH4KAADZCgAA2goAANkKAADaCgAA1AoAANUKAADVCgAA1AoAANUKAADVCgAAfwoAAIAKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAAxQoAAMUKAADECgAAxAoAAIUKAACGCgAAhQoAAIYKAACFCgAAhgoAAF0KAABeCgAAXQoAAF4KAABdCgAAXgoAAF0KAABeCgAA1AoAANUKAADECgAA1AoAANUKAADECgAAxQoAAMUKAACNCgAAjgoAAOkKAADqCgAA6QoAAOoKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAACPCgAAkAoAAMQKAADUCgAA1AoAANQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAANQKAADUCgAAlQoAAJYKAACVCgAAlgoAAJUKAACWCgAAbQoAAG4KAABtCgAAbgoAAG0KAABuCgAAbQoAAG4KAADUCgAA1QoAAMQKAADVCgAA1QoAAMQKAADFCgAA1QoAAH0KAAB+CgAAfgoAAH0KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH0KAAB+CgAAfQoAAH4KAAB9CgAAfgoAAH0KAAB+CgAAfQoAAH4KAAB5CgAAegoAAH0KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB+CgAAfgoAAH4KAAB9CgAAfQoAAH4KAAB9CgAAfgoAANQKAADVCgAAxAoAAMQKAADFCgAAxAoAAMUKAADGCgAAjQoAAI4KAACOCgAAjQoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjQoAAI4KAACNCgAAjgoAAI0KAACOCgAAjQoAAI4KAACNCgAAjgoAAIkKAACKCgAAjQoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI4KAACOCgAAjgoAAI0KAACNCgAAjgoAAI0KAACOCgAA1AoAANUKAADECgAAxAoAAMUKAADECgAAxQoAAMYKAADECgAAxAoAAMQKAADFCgAAxAoAAMQKAADECgAAxQoAAMQKAADECgAAxAoAAMQKAADFCgAAxAoAAMUKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADUCgAA1AoAANQKAADUCgAA1AoAAMQKAADFCgAAxQoAANUKAADVCgAA1QoAANUKAADECgAAxQoAAMUKAADFCgAAxAoAAMUKAADUCgAA1QoAAMQKAADECgAAxQoAAMQKAADFCgAAxQoAANQKAADUCgAAxAoAAMQKAADUCgAA1AoAAMQKAADECgAA1AoAANQKAADUCgAAxAoAAMQKAADUCgAA1QoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMUKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADFCgAA1AoAAMQKAADECgAAxQoAAMUKAADFCgAA1QoAANUKAADFCgAAxQoAANUKAADUCgAAxAoAAMQKAADFCgAAxAoAAMUKAADFCgAAxQoAAMYKAADUCgAA1AoAANQKAADECgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAANQKAADUCgAAxAoAAMQKAADFCgAAxQoAAMUKAADFCgAA1QoAANUKAADVCgAAxAoAAMUKAADVCgAAxQoAANQKAADECgAAxAoAAMUKAADFCgAAxQoAANUKAADFCgAAxQoAAMUKAADFCgAAxQoAANQKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAANQKAADUCgAA1AoAANQKAADUCgAAxAoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADVCgAA1QoAANUKAADUCgAA1AoAANUKAADECgAAxQoAAMUKAADGCgAA1AoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxAoAAMUKAADECgAAxQoAAMQKAADFCgAAxAoAAMQKAADFCgAAxQoAAMUKAADFCgAAxQoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANQKAADUCgAA1AoAANQKAADVCgAAxAoAAMUKAADFCgAAxQoAAMQKAADUCgAAxAoAAMQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAAxQoAAMUKAADFCgAA1AoAANUKAADVCgAA1QoAANUKAADVCgAAxQoAANUKAADFCgAAxQoAAMUKAADUCgAA1QoAANUKAADFCgAAxQoAAMUKAADFCgAAxQoAANUKAADFCgAA1AoAANQKAADECgAA1AoAANQKAADUCgAA1QoAAMUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAA1AoAANUKAADVCgAA1QoAANUKAADVCgAAxQoAAMUKAADUCgAA1QoAAMQKAADECgAAxQoAANQKAADVCgAA1QoAAMQKAADFCgAAxQoAAMUKAADFCgAAxQoAANQKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAA1AoAANUKAADVCgAAxAoAAMQKAADECgAAxQoAANUKAADVCgAA1QoAAMUKAADFCgAAxQoAAMUKAADFCgAA1QoAANQKAADVCgAAxAoAAMQKAADECgAAxAoAAMUKAADFCgAAxQoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAAMQKAADECgAAxAoAAMUKAADVCgAA1QoAANUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADECgAAxAoAAMQKAADUCgAA1AoAANQKAADVCgAA1AoAANQKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1AoAAMQKAADFCgAAxAoAANQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAA1AoAANQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADVCgAA1AoAANQKAADUCgAA1QoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADUCgAAxAoAAMUKAADECgAAxQoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADVCgAAxAoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANUKAADVCgAA1QoAANQKAADECgAAxQoAANQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADFCgAAxQoAAMUKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMUKAADFCgAAxAoAAMQKAADUCgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAMQKAADECgAAxQoAAMUKAADFCgAAxQoAANUKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAANQKAADUCgAA1AoAAMQKAADECgAAxAoAAMQKAADECgAAxAoAAA==", "encoding": "base64", "height": 50, "id": 1, "name": "\u56fe\u5757\u5c42 1", "opacity": 1, "type": "tilelayer", "visible": true, "width": 50, "x": 0, "y": 0 }], "nextlayerid": 2, "nextobjectid": 1, "orientation": "orthogonal", "renderorder": "right-down", "tiledversion": "1.11.2", "tileheight": 16, "tilesets": [{ "columns": 20, "firstgid": 1, "image": "..\/assets\/\u56fe\u7247\u7d20\u6750\u5e93\/\u5730\u56fe\u5143\u4ef6\/zzjbdt1.png", "imageheight": 480, "imagewidth": 320, "margin": 0, "name": "zzjbdt1", "spacing": 0, "tilecount": 600, "tileheight": 16, "tilewidth": 16 }, { "columns": 16, "firstgid": 601, "image": "..\/assets\/\u56fe\u7247\u7d20\u6750\u5e93\/\u5730\u56fe\u5143\u4ef6\/zzjbdt2 XII.png", "imageheight": 1900, "imagewidth": 256, "margin": 0, "name": "zzjbdt2 XII", "spacing": 0, "tilecount": 1888, "tileheight": 16, "tiles": [{ "id": 4, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 5, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 6, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 7, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 8, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 9, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 20, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 21, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 22, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 23, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 24, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 25, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 36, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 37, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 38, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 39, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 40, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 41, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 52, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 53, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 54, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 55, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 56, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 57, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 170, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 171, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 186, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 187, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 204, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 205, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 220, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 221, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 290, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }, { "height": 16, "id": 2, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 291, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }, { "height": 16, "id": 2, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 306, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }, { "height": 16, "id": 2, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 307, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "properties": [{ "name": "collides", "type": "string", "value": "true" }], "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }], "tilewidth": 16 }, { "columns": 16, "firstgid": 2489, "image": "..\/assets\/\u56fe\u7247\u7d20\u6750\u5e93\/\u5730\u56fe\u5143\u4ef6\/\u91cd-\u88c5\u57ce\u95471.png", "imageheight": 2048, "imagewidth": 256, "margin": 0, "name": "\u91cd-\u88c5\u57ce\u95471", "spacing": 0, "tilecount": 2048, "tileheight": 16, "tiles": [{ "id": 0, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 1, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 2, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 3, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 4, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 5, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 16, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 17, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 18, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 19, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 20, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 21, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 32, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 33, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 34, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 35, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 36, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 37, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 48, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 49, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 50, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 51, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 52, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 53, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 64, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 65, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 66, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 67, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 68, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 69, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 80, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 81, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 82, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 83, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 84, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 85, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 96, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 97, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 112, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 113, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 128, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 129, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 144, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 145, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 160, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 161, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 164, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 165, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 176, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 177, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 180, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 181, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 192, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 193, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 194, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 195, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 196, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 197, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 200, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0.0421403801413458, "y": 0.0561871735217947 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 201, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0.0421403801413458, "y": 0.0561871735217947 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 206, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 207, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 208, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 209, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 210, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 211, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 212, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 213, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 216, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0.0421403801413458, "y": 0.0561871735217947 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 217, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0.0421403801413458, "y": 0.0561871735217947 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 222, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 223, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 320, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 321, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 322, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 323, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 324, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 325, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 326, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 327, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 328, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 329, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 336, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 337, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 338, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 339, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 340, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 341, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 342, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 343, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 344, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 345, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 352, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 353, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 356, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 357, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 358, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 359, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 360, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 361, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 362, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 363, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 368, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 369, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 372, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 373, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 374, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 375, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 376, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 377, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 378, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 379, "objectgroup": { "draworder": "index", "id": 2, "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 384, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 385, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 386, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 387, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 388, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 389, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 392, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 393, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 400, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 401, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 402, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 403, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 404, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 405, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 408, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }, { "id": 409, "objectgroup": { "draworder": "topdown", "name": "", "objects": [{ "height": 16, "id": 1, "name": "", "rotation": 0, "type": "", "visible": true, "width": 16, "x": 0, "y": 0 }], "opacity": 1, "type": "objectgroup", "visible": true, "x": 0, "y": 0 } }], "tilewidth": 16 }], "tilewidth": 16, "type": "map", "version": "1.10", "width": 50 }
    let game;

    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: Math.min(800, window.innerWidth),
        height: Math.min(600, window.innerHeight),
        backgroundColor: '#1a1a2e',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    function preload() {
        this.load.on('progress', (value) => {
            document.getElementById('loadingBar').style.width = (value * 100) + '%';
            document.getElementById('loadingText').textContent = `加载中... ${Math.floor(value * 100)}%`;
        });

        this.load.on('complete', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 500);
        });

        // 加载地图图块 - 3个tileset（所有地图共用）
        this.load.image('tiles1', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/zzjbdt1.png');
        this.load.image('tiles2', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/zzjbdt2%20XII.png');
        this.load.image('tiles3', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E5%9C%B0%E5%9B%BE%E5%85%83%E4%BB%B6/%E9%87%8D-%E8%A3%85%E5%9F%8E%E9%95%871.png');

        // 加载拉多镇地图JSON数据（内嵌数据）
        this.load.tilemapTiledJSON('map', mapData);
        
        // 🗺️ 加载修车店地图JSON数据（从URL）
        this.load.tilemapTiledJSON('map_garage', 'https://raw.githubusercontent.com/zltbrm/assets/master/map/%E6%8B%89%E5%A4%9A%E9%95%87-%E4%BF%AE%E8%BD%A6%E5%BA%97.json');

        // 加载主角精灵图 (4向4帧：每行4帧，共4行)
        this.load.spritesheet('player', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E4%B8%BB%E8%A7%921.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // 加载队友行走图
        this.load.spritesheet('char2', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E4%B8%BB%E8%A7%922.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('char3', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E4%B8%BB%E8%A7%923.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // 🚗 [战车系统已禁用] 加载战车行走图
        /* this.load.spritesheet('tank1', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E7%AC%AC%E5%9B%9B%E8%BE%86%E6%88%98%E8%BD%A6.png', {
          frameWidth: 32,
          frameHeight: 32
        });
        
        this.load.spritesheet('tank2', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E7%AC%AC%E5%85%AD%E8%BE%86%E6%88%98%E8%BD%A6.png', {
          frameWidth: 32,
          frameHeight: 32
        });
        
        this.load.spritesheet('tank3', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E7%AC%AC%E4%B8%83%E8%BE%86%E6%88%98%E8%BD%A6.png', {
          frameWidth: 32,
          frameHeight: 32
        }); */

        // 加载NPC精灵图
        this.load.spritesheet('npc_female', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E5%B9%B3%E6%B0%91%E5%A5%B31.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('npc_male', 'https://raw.githubusercontent.com/zltbrm/assets/master/%E8%A1%8C%E8%B5%B0%E5%9B%BE/%E5%B9%B3%E6%B0%91%E7%94%B71.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    function create() {
        // 🗺️ 初始化当前地图为拉多镇
        this.currentMapKey = 'map'; // 'map' = 拉多镇, 'map_garage' = 修车店
        this.currentMapName = '拉多镇';
        
        // 🗺️ 创建地图加载函数
        this.loadMap = function(mapKey, mapName, layerName, spawnX, spawnY) {
            console.log(`🗺️ 正在加载地图: ${mapName}`);
            
            // 销毁旧地图和图层
            if (this.collisionLayer) {
                this.collisionLayer.destroy();
                this.collisionLayer = null;
            }
            if (this.currentMap) {
                this.currentMap.destroy();
                this.currentMap = null;
            }
            
            // 创建新地图
            const map = this.make.tilemap({ key: mapKey });
            
            // 添加图块集
            const tileset1 = map.addTilesetImage('zzjbdt1', 'tiles1');
            const tileset2 = map.addTilesetImage('zzjbdt2 XII', 'tiles2');
            const tileset3 = map.addTilesetImage('重-装城镇1', 'tiles3');
            
            // 创建图层（根据不同地图使用不同的图层名）
            const layer = map.createLayer(layerName, [tileset1, tileset2, tileset3], 0, 0);
            
            if (layer) {
                // 设置碰撞
                layer.setCollisionFromCollisionGroup();
                this.collisionLayer = layer;
                
                console.log('✅ 地图碰撞系统已启用');
            }
            
            // 更新物理世界和相机边界
            this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            
            // 移动玩家到新位置
            if (spawnX !== undefined && spawnY !== undefined) {
                this.player.setPosition(spawnX, spawnY + 12);
            }
            
            // 存储当前地图信息
            this.currentMap = map;
            this.currentMapKey = mapKey;
            this.currentMapName = mapName;
            
            // 重新设置碰撞
            if (this.collisionLayer) {
                this.physics.add.collider(this.player, this.collisionLayer);
            }
            
            console.log(`✅ 地图加载完成: ${mapName}`);
        };
        
        // 🗺️ 地图切换函数
        this.switchMap = function(targetMapName, spawnKey) {
            console.log(`🔄 切换到地图: ${targetMapName}, 出生点: ${spawnKey}`);
            
            let mapKey, layerName, spawnX, spawnY;
            
            if (targetMapName === '拉多镇') {
                mapKey = 'map';
                layerName = '图块层 1';
                
                // 根据出生点设置位置
                if (spawnKey === 'from_garage') {
                    // 从修车店出来的位置（修车店门口）
                    spawnX = 20 * 32;
                    spawnY = 15 * 32;
                } else {
                    // 默认出生点
                    spawnX = 12 * 32;
                    spawnY = 10 * 32;
                }
            } else if (targetMapName === '拉多镇-修车店') {
                mapKey = 'map_garage';
                layerName = '下层';
                
                // 从拉多镇进入的位置（门口）
                spawnX = 8 * 32;
                spawnY = 11 * 32;
            } else {
                console.error(`❌ 未知的地图: ${targetMapName}`);
                return;
            }
            
            // 加载新地图
            this.loadMap(mapKey, targetMapName, layerName, spawnX, spawnY);
        };

        // 使用内嵌的地图数据创建初始地图（拉多镇）
        this.loadMap('map', '拉多镇', '图块层 1', 12 * 32, 10 * 32);

        // ==================== 创建玩家 ====================
        // 人物规格：32x32px的sprite，每次移动32px（对齐到2个16px的tile）
        const gridSize = 32;   // 移动网格大小 = 32px

        // 玩家起始位置：放在安全的中心区域
        // 使用32px对齐的坐标（必须是32的倍数，即偶数个tile）
        // 起始位置：(12格, 10格) = (384px, 320px)
        const startGridX = 12;  // 第12个32px格子（= 24个tile）
        const startGridY = 10;  // 第10个32px格子（= 20个tile）

        // 转换为像素坐标：格子坐标 * 32
        const startPixelX = startGridX * 32;  // 384px
        const startPixelY = startGridY * 32;  // 320px

        // ==================== 创建多角色系统 ====================
        // 将三个角色统一管理
        this.characterSprites = []; // 存储所有角色的sprite
        this.activeCharacterIndex = 0; // 当前控制的角色索引（默认主角1）

        // 创建主角1
        this.player = this.physics.add.sprite(
            startPixelX,
            startPixelY + 12,
            'player',
            0
        );
        this.player.setSize(16, 16);
        this.player.setOffset(8, 16);
        this.player.setCollideWorldBounds(true);
        this.player.characterIndex = 0; // 对应characters[0]
        // 🚗 [战车系统已禁用] 移除战车相关字段
        // this.player.inTank = false;
        // this.player.currentTank = null;
        if (this.collisionLayer) {
            this.physics.add.collider(this.player, this.collisionLayer);
        }
        this.characterSprites.push(this.player);

        // 创建主角2
        this.follower1 = this.physics.add.sprite(
            startPixelX - 32,
            startPixelY + 12,
            'char2',
            0
        );
        this.follower1.setSize(16, 16);
        this.follower1.setOffset(8, 16);
        this.follower1.setCollideWorldBounds(true);
        this.follower1.characterIndex = 1; // 对应characters[1]
        // 🚗 [战车系统已禁用] 移除战车相关字段
        // this.follower1.inTank = false;
        // this.follower1.currentTank = null;
        if (this.collisionLayer) {
            this.physics.add.collider(this.follower1, this.collisionLayer);
        }
        this.characterSprites.push(this.follower1);

        // 创建主角3
        this.follower2 = this.physics.add.sprite(
            startPixelX - 64,
            startPixelY + 12,
            'char3',
            0
        );
        this.follower2.setSize(16, 16);
        this.follower2.setOffset(8, 16);
        this.follower2.setCollideWorldBounds(true);
        this.follower2.characterIndex = 2; // 对应characters[2]
        // 🚗 [战车系统已禁用] 移除战车相关字段
        // this.follower2.inTank = false;
        // this.follower2.currentTank = null;
        if (this.collisionLayer) {
            this.physics.add.collider(this.follower2, this.collisionLayer);
        }
        this.characterSprites.push(this.follower2);

        // 保持向后兼容
        this.followers = [this.follower1, this.follower2];
        this.followerHistory = [];  // 记录主角1的移动历史
        this.maxHistoryLength = 60;

        // 🚗 [战车系统已禁用] 创建战车实体
        /* // ==================== 创建战车实体 ====================
        // 战车作为地图上的实体存在
        this.tanks = [];
        
        // 战车1 - R-Wolf (停在镇子入口)
        this.tank1 = this.physics.add.sprite(
          startPixelX + 96,  // 在主角右边96px
          startPixelY - 20,  // 向上移动一格（32px），并微调
          'tank1',
          0
        );
        this.tank1.setSize(24, 24);
        this.tank1.setOffset(4, 8);
        this.tank1.tankIndex = 0; // 对应tanks[0]
        this.tank1.visible = true;
        this.tank1.occupiedBy = null; // 记录谁在驾驶
        if (this.collisionLayer) {
          this.physics.add.collider(this.tank1, this.collisionLayer);
        }
        this.tanks.push(this.tank1);
        
        // 战车2 - Wild Bus (停在镇子中心)
        this.tank2 = this.physics.add.sprite(
          startPixelX + 160,
          startPixelY - 20,  // 向上移动一格（32px），并微调
          'tank2',
          0
        );
        this.tank2.setSize(24, 24);
        this.tank2.setOffset(4, 8);
        this.tank2.tankIndex = 1; // 对应tanks[1]
        this.tank2.visible = true;
        this.tank2.occupiedBy = null;
        if (this.collisionLayer) {
          this.physics.add.collider(this.tank2, this.collisionLayer);
        }
        this.tanks.push(this.tank2);
        
        // 战车3 - 未获得 (不显示)
        this.tank3 = null;
        
        console.log('✅ 队友和战车系统已创建'); */

        // 🚗 [战车系统已禁用] 初始化空数组避免错误
        this.tanks = [];
        console.log('✅ 队友系统已创建 [战车系统已禁用]');

        // 创建动画 - 4向4帧
        // 根据Metal Max的行走图标准格式：下、左、右、上

        // 主角1动画
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        // 主角2动画
        this.anims.create({
            key: 'char2-walk-down',
            frames: this.anims.generateFrameNumbers('char2', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'char2-walk-left',
            frames: this.anims.generateFrameNumbers('char2', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'char2-walk-right',
            frames: this.anims.generateFrameNumbers('char2', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'char2-walk-up',
            frames: this.anims.generateFrameNumbers('char2', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        // 主角3动画
        this.anims.create({
            key: 'char3-walk-down',
            frames: this.anims.generateFrameNumbers('char3', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'char3-walk-left',
            frames: this.anims.generateFrameNumbers('char3', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'char3-walk-right',
            frames: this.anims.generateFrameNumbers('char3', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'char3-walk-up',
            frames: this.anims.generateFrameNumbers('char3', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        // 🚗 [战车系统已禁用] 战车动画
        /* // 战车1动画
        this.anims.create({
          key: 'tank1-walk-down',
          frames: this.anims.generateFrameNumbers('tank1', { start: 0, end: 3 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank1-walk-left',
          frames: this.anims.generateFrameNumbers('tank1', { start: 4, end: 7 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank1-walk-right',
          frames: this.anims.generateFrameNumbers('tank1', { start: 8, end: 11 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank1-walk-up',
          frames: this.anims.generateFrameNumbers('tank1', { start: 12, end: 15 }),
          frameRate: 8,
          repeat: -1
        });
        
        // 战车2动画
        this.anims.create({
          key: 'tank2-walk-down',
          frames: this.anims.generateFrameNumbers('tank2', { start: 0, end: 3 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank2-walk-left',
          frames: this.anims.generateFrameNumbers('tank2', { start: 4, end: 7 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank2-walk-right',
          frames: this.anims.generateFrameNumbers('tank2', { start: 8, end: 11 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank2-walk-up',
          frames: this.anims.generateFrameNumbers('tank2', { start: 12, end: 15 }),
          frameRate: 8,
          repeat: -1
        });
        
        // 战车3动画
        this.anims.create({
          key: 'tank3-walk-down',
          frames: this.anims.generateFrameNumbers('tank3', { start: 0, end: 3 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank3-walk-left',
          frames: this.anims.generateFrameNumbers('tank3', { start: 4, end: 7 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank3-walk-right',
          frames: this.anims.generateFrameNumbers('tank3', { start: 8, end: 11 }),
          frameRate: 8,
          repeat: -1
        });
        this.anims.create({
          key: 'tank3-walk-up',
          frames: this.anims.generateFrameNumbers('tank3', { start: 12, end: 15 }),
          frameRate: 8,
          repeat: -1
        }); */

        // 键盘输入
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            m: Phaser.Input.Keyboard.KeyCodes.M,  // 打开菜单
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER  // 打开菜单（兼容）
            // 🚗 [战车系统已禁用] 移除E键上下车
            // e: Phaser.Input.Keyboard.KeyCodes.E  // 上下车
        });

        console.log('🎮 按键已注册:', this.keys);

        // 🚗 [战车系统已禁用] 上下车标记
        // this.playerInTank = false;
        // this.currentTank = null;

        // 菜单快捷键监听
        this.keys.m.on('down', () => {
            console.log('🔑 M键被按下');
            if (window.Alpine && window.Alpine.store) {
                console.log('✅ Alpine已就绪，打开菜单');
                window.Alpine.store('gameMenu').openMenu();
            } else {
                console.error('❌ Alpine未就绪', window.Alpine);
            }
        });

        this.keys.enter.on('down', () => {
            console.log('🔑 Enter键被按下');
            if (window.Alpine && window.Alpine.store) {
                console.log('✅ Alpine已就绪，打开菜单');
                window.Alpine.store('gameMenu').openMenu();
            } else {
                console.error('❌ Alpine未就绪', window.Alpine);
            }
        });

        // 🚗 [战车系统已禁用] E键上下车监听
        /* this.keys.e.on('down', () => {
          console.log('🔑 E键被按下 - 检查所有角色上下车');
          
          // 遍历所有角色，处理上下车
          this.characterSprites.forEach((charSprite, charIndex) => {
            // 如果该角色已经在战车上，则下车
            if (charSprite.inTank && charSprite.currentTank) {
              this.dismountTank(charIndex);
              return;
            }
            
            // 检测该角色是否靠近战车，如果是则上车
            if (this.tanks) {
              for (let tank of this.tanks) {
                if (!tank || !tank.visible) continue;
                
                // 跳过已被占用的战车
                if (tank.occupiedBy !== null) continue;
                
                const distance = Phaser.Math.Distance.Between(
                  charSprite.x, charSprite.y,
                  tank.x, tank.y
                );
                
                // 如果靠近战车（距离小于48px）
                if (distance < 48) {
                  this.boardTank(tank, charIndex);
                  return; // 只上一辆车
                }
              }
            }
          });
        }); */

        // 保存场景引用供外部访问
        window.gameScene = this;

        // ==================== 虚拟方向键系统 ====================
        this.virtualInput = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        // 绑定虚拟按键事件
        const dpadButtons = document.querySelectorAll('.dpad-btn');
        dpadButtons.forEach(btn => {
            const direction = btn.getAttribute('data-direction');

            // 触摸和鼠标事件
            const startPress = () => {
                this.virtualInput[direction] = true;
            };

            const endPress = () => {
                this.virtualInput[direction] = false;
            };

            btn.addEventListener('mousedown', startPress);
            btn.addEventListener('mouseup', endPress);
            btn.addEventListener('mouseleave', endPress);
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startPress();
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                endPress();
            });
            btn.addEventListener('touchcancel', endPress);
        });

        // ==================== 绑定菜单按钮事件 ====================
        const menuButton = document.getElementById('menuButton');
        if (menuButton) {
            const openMenu = () => {
                console.log('🖱️ 菜单按钮被点击（直接事件）');
                if (window.Alpine && window.Alpine.store) {
                    console.log('✅ Alpine已就绪，打开菜单');
                    window.Alpine.store('gameMenu').openMenu();
                } else {
                    console.error('❌ Alpine未就绪', window.Alpine);
                }
            };

            menuButton.addEventListener('click', openMenu);
            menuButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                openMenu();
            });
            console.log('✅ 菜单按钮事件已绑定');
        } else {
            console.error('❌ 未找到菜单按钮');
        }

        // 相机设置
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.5);  // 适当放大以获得更好的视觉效果

        // 调试：显示网格（可选，帮助查看对齐）
        // this.add.grid(0, 0, map.widthInPixels, map.heightInPixels, 16, 16, 0x00ff00, 0.2, 0xff0000, 1).setOrigin(0);

        // ==================== 设置物理世界和相机边界 ====================
        // 地图是50x50个tile（800x800px）
        // 设置物理世界边界为整个地图
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // 设置相机边界为整个地图
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.playerSpeed = 160;

        // 方格移动系统变量
        // 取消缩放后，原始tile是16px，每次移动2个tile（32px）
        this.tileSize = 32; // 2个tile的大小（16 * 2）
        this.isMoving = false;
        this.moveDirection = null;

        // ==================== 随机战斗系统 ====================
        this.battleSteps = 0;
        this.battleChancePerStep = 0.05; // 每步5%概率触发战斗

        // 敌人配置 - 使用GitHub图片素材
        this.enemyTypes = [
            { name: '变异野狗', sprite: '🐺', className: 'enemy-dog', hp: 30, atk: 8, def: 3 },
            { name: '辐射蝎', sprite: '🦂', className: 'enemy-scorpion', hp: 40, atk: 10, def: 5 },
            { name: '巡逻机器人', sprite: '🤖', className: 'enemy-robot', hp: 50, atk: 12, def: 7 },
            { name: '废土强盗', sprite: '💀', className: 'enemy-bandit', hp: 35, atk: 11, def: 4 }
        ];

        // ==================== NPC系统 ====================
        // NPC配置 - 使用32px网格对齐
        this.npcs = [
            {
                name: '艾莉丝',
                gender: 'female',
                spriteKey: 'npc_female',
                gridX: 12,  // 第10个32px格子（= 20个tile = 320px）
                gridY: 8,   // 第8个32px格子（= 16个tile = 256px）
                sprite: null,
                interactBtn: null,
                // === 完整剧情设定 ===
                story: {
                    background: `艾莉丝，25岁，拉多镇酒馆的老板娘。大破坏前曾是诺亚研究所的数据分析师，亲眼目睹了超级计算机"诺亚"失控的那一天。她是少数幸存下来并逃出研究所的科学家之一。`,
                    personality: `表面上开朗热情，经营着镇上唯一的酒馆，但内心深处对自己曾参与诺亚项目感到深深的愧疚。她用微笑掩盖痛苦，用忙碌麻痹自己，试图用帮助冒险者的方式来赎罪。`,
                    secrets: `她保存着一份诺亚系统的部分源代码备份，藏在酒馆地下室。这份代码可能是关闭诺亚或理解其动机的关键。她害怕这个秘密被发现，因为这会让她成为赏金猎人和残余人类势力的目标。`,
                    relationships: `她暗中资助镇上的孤儿院，因为她自己的妹妹在大破坏中失踪。她对战车猎人既敬畏又担心，因为她知道真正的敌人远比怪物可怕。`,
                    questHints: `她会向信任的冒险者透露关于"旧世界遗迹"的情报，那里可能有高级战车部件。当玩家声望足够高时，她可能会求助玩家调查妹妹的下落——而线索指向诺亚控制的禁区。`,
                    dialogue: `性格友好但略带忧郁，喜欢用酒馆故事来委婉地传递情报。说话时偶尔会流露出科学家的严谨和对技术细节的敏感。会不经意间提到"那个系统"时语气变得凝重。`
                }
            },
            {
                name: '杰克',
                gender: 'male',
                spriteKey: 'npc_male',
                gridX: 15,  // 第15个32px格子（= 30个tile = 480px）
                gridY: 10,  // 第10个32px格子（= 20个tile = 320px）
                sprite: null,
                interactBtn: null,
                // === 完整剧情设定 ===
                story: {
                    background: `杰克，32岁，退役战车猎人，现在是拉多镇的机械师。曾是"钢铁之牙"佣兵团的王牌驾驶员，在一次针对诺亚卫星基地的突袭中失去了右腿和整个小队。他用诺亚部队的废弃零件改造了自己的义肢。`,
                    personality: `沉默寡言，对战车维修极其专业，但对诺亚和机械充满矛盾情感。他既憎恨夺走队友生命的机械军团，又不得不依靠机械义肢生存。外表粗犷但内心细腻，用修理战车来寻找生命的意义。`,
                    secrets: `他的义肢里植入了从诺亚指挥官型机器人身上拆下的AI芯片，这让他能够"感知"附近诺亚机械的活动，但也让他担心自己是否正在被诺亚监控或改造。他每晚都梦见队友的惨死，以及冰冷的机械之眼。`,
                    relationships: `他和艾莉丝互相知道对方的秘密，形成了某种微妙的同盟。他视镇上的年轻猎人为自己失去的队友，会偷偷在他们的战车上安装额外的装甲板。`,
                    questHints: `他可以教授玩家特殊的战车改造技术，并会透露诺亚部队的弱点情报。当玩家展现实力后，他会委托调查"钢铁之牙"的残骸地点，那里可能有他前队长遗留的超级战车设计图。`,
                    dialogue: `说话简短有力，带有军人风格。谈到战车改造时会变得健谈，但提到过去时会突然沉默。偶尔会下意识地触碰义肢，眼神变得复杂。对新人猎人会给出严厉但实用的建议。`
                }
            },
            // ⚔️ 战斗测试NPC
            {
                name: '战斗教官',
                gender: 'male',
                spriteKey: 'npc_male',
                gridX: 13,  // 艾莉丝右边一格
                gridY: 7,   // 艾莉丝上面一格
                sprite: null,
                interactBtn: null,
                isBattleTest: true,  // 标记为战斗测试NPC
                story: null
            }
        ];

        // 创建NPC精灵
        this.npcs.forEach((npc, index) => {
            // 计算NPC的像素位置（使用32px网格对齐）
            const npcPixelX = npc.gridX * 32;  // 格子坐标 * 32
            const npcPixelY = npc.gridY * 32;

            // 创建NPC精灵（32x32px，原始大小）
            npc.sprite = this.physics.add.sprite(npcPixelX, npcPixelY + 12, npc.spriteKey, 0);
            npc.sprite.setImmovable(true);

            // ✅ 设置NPC的碰撞体积（与玩家相同）
            npc.sprite.setSize(16, 16);       // 碰撞体16x16
            npc.sprite.setOffset(8, 16);      // 碰撞体居中偏下

            // ✅ 启用NPC与地图图层的碰撞
            if (this.collisionLayer) {
                this.physics.add.collider(npc.sprite, this.collisionLayer);
            }

            // 创建交互按钮（HTML元素）
            const btn = document.createElement('button');
            btn.className = 'npc-interact-btn';
            btn.textContent = npc.isBattleTest ? `⚔️ ${npc.name}` : `💬 ${npc.name}`;
            btn.style.display = 'none';
            btn.onclick = () => {
                console.log('🖱️ 按钮被点击了！NPC:', npc.name, npc.gender);

                // 如果是战斗测试NPC，显示确认对话框
                if (npc.isBattleTest) {
                    const confirmed = confirm('战斗教官：想要进行战斗测试吗？\n\n这是一场多敌人战斗测试。');
                    if (confirmed) {
                        // 触发多敌人战斗测试
                        if (window.startBattle) {
                            window.startBattle([
                                { name: '战狗', className: 'enemy-dog', hp: 50, atk: 12, def: 5 },
                                { name: '流氓', className: 'enemy-bandit', hp: 40, atk: 10, def: 4 },
                                { name: '机器人', className: 'enemy-robot', hp: 60, atk: 15, def: 8 }
                            ]);
                        }
                    }
                } else {
                    // 普通NPC，打开对话框
                    if (window.Alpine && window.Alpine.store) {
                        console.log('✅ Alpine 和 store 都存在，调用 openDialog');
                        window.Alpine.store('npcDialog').openDialog(npc.name, npc.gender, npc.story);
                    } else {
                        console.error('❌ Alpine 或 store 不存在！');
                    }
                }
            };
            document.body.appendChild(btn);
            npc.interactBtn = btn;
            console.log('✅ NPC 按钮已创建:', npc.name);
        });

        // ✅ 建立玩家与所有NPC的碰撞关系
        this.npcs.forEach(npc => {
            this.physics.add.collider(this.player, npc.sprite);
        });

        // 存储NPC引用供update使用
        this.npcSystem = {
            npcs: this.npcs,
            interactionDistance: 64 // 交互距离（2个格子 = 64px）
        };
    }

    function update() {
        // ==================== 队友跟随系统更新 ====================
        // 队友位置更新逻辑已移至移动完成后（onComplete回调中）
        // 这里只需要更新队友的显示状态
        if (this.followers && this.followers.length > 0) {
            this.followers.forEach((follower, index) => {
                // 如果队友在战车上，隐藏队友sprite
                if (follower && follower.inTank) {
                    follower.visible = false;
                } else {
                    follower.visible = true;
                }
            });
        }

        // 🚗 [战车系统已禁用] 战车上下车检测
        /* // ==================== 战车上下车检测 ====================
        // 检测玩家是否靠近战车
        if (this.tanks && !this.isMoving) {
          this.tanks.forEach(tank => {
            if (!tank || !tank.visible) return;
            
            const distance = Phaser.Math.Distance.Between(
              this.player.x, this.player.y,
              tank.x, tank.y
            );
            
            // 如果玩家靠近战车（距离小于48px）
            if (distance < 48) {
              // 显示上车提示（这里简化，后续可以添加UI提示）
              console.log('靠近战车', tank.tankIndex, '按E上车');
            }
          });
        } */

        // 方格移动系统 - 每次移动一个完整的格子
        if (!this.isMoving) {
            let direction = null;

            // 检测输入 - 键盘 + 虚拟按键
            if (this.cursors.up.isDown || this.keys.w.isDown || this.virtualInput.up) {
                direction = 'up';
            } else if (this.cursors.down.isDown || this.keys.s.isDown || this.virtualInput.down) {
                direction = 'down';
            } else if (this.cursors.left.isDown || this.keys.a.isDown || this.virtualInput.left) {
                direction = 'left';
            } else if (this.cursors.right.isDown || this.keys.d.isDown || this.virtualInput.right) {
                direction = 'right';
            }

            if (direction) {
                this.startGridMove(direction);
            } else {
                // 停止动画
                this.player.anims.stop();
            }
        }

        // 更新HUD坐标 - 显示多种坐标系统
        const pixelX = Math.floor(this.player.x);
        const pixelY = Math.floor(this.player.y);
        const tileX = Math.floor(this.player.x / 16);   // 16px的tile坐标
        const tileY = Math.floor(this.player.y / 16);
        const gridX = Math.floor(this.player.x / 32);   // 32px的格子坐标
        const gridY = Math.floor(this.player.y / 32);

        const posEl = document.querySelector('[x-text="position"]');
        if (posEl) {
            posEl.textContent = `格子(${gridX},${gridY}) Tile(${tileX},${tileY}) Px(${pixelX},${pixelY})`;
        }

        // ==================== NPC交互检测 ====================
        if (this.npcSystem) {
            this.npcSystem.npcs.forEach(npc => {
                // 计算玩家与NPC的距离
                const distance = Phaser.Math.Distance.Between(
                    this.player.x, this.player.y,
                    npc.sprite.x, npc.sprite.y
                );

                // 如果玩家靠近NPC，显示交互按钮
                if (distance < this.npcSystem.interactionDistance) {
                    npc.interactBtn.style.display = 'block';

                    // 将NPC的世界坐标转换为屏幕坐标
                    // 计算相对于相机的位置
                    const cam = this.cameras.main;
                    const screenX = (npc.sprite.x - cam.scrollX) * cam.zoom + cam.x;
                    const screenY = (npc.sprite.y - cam.scrollY) * cam.zoom + cam.y;

                    npc.interactBtn.style.left = screenX + 'px';
                    npc.interactBtn.style.top = (screenY - 40) + 'px';
                } else {
                    npc.interactBtn.style.display = 'none';
                }
            });
        }
    }

    // 🚗 [战车系统已禁用] 上下车系统
    /* // ==================== 上下车系统 ====================
    Phaser.Scene.prototype.tryBoardOrDismount = function() {
      // 检查所有角色
      this.characterSprites.forEach((charSprite, charIndex) => {
        // 如果该角色已经在战车上，检测是否要下车
        if (charSprite.inTank && charSprite.currentTank) {
          // 检测是否按下E键（这个逻辑会在键盘事件中处理）
          // 这里只是提供下车的接口
          return;
        }
        
        // 检测该角色是否靠近战车
        if (this.tanks) {
          for (let tank of this.tanks) {
            if (!tank || !tank.visible) continue;
            
            // 跳过已被占用的战车
            if (tank.occupiedBy !== null && tank.occupiedBy !== charIndex) continue;
            
            const distance = Phaser.Math.Distance.Between(
              charSprite.x, charSprite.y,
              tank.x, tank.y
            );
            
            // 如果靠近战车（距离小于48px），可以上车
            if (distance < 48 && !charSprite.inTank) {
              // 自动上车（仅当按E键时，会在键盘事件中调用boardTank）
            }
          }
        }
      });
    };
    
    // 上车 - 支持指定角色
    Phaser.Scene.prototype.boardTank = function(tank, characterIndex = 0) {
      const charSprite = this.characterSprites[characterIndex];
      if (!charSprite || charSprite.inTank) return;
      
      console.log(`🚗 角色${characterIndex + 1}上车！战车${tank.tankIndex + 1}`);
      
      // 隐藏角色sprite
      charSprite.visible = false;
      charSprite.inTank = true;
      charSprite.currentTank = tank;
      
      // 记录战车状态
      tank.occupiedBy = characterIndex;
      
      // 将角色移动到战车位置
      charSprite.x = tank.x;
      charSprite.y = tank.y;
      
      // 更新UI数据并强制触发Alpine响应式更新
      const menuElement = document.querySelector('[x-data="gameMenu"]');
      if (menuElement && menuElement.__x) {
        const menuData = menuElement.__x.$data;
        if (menuData.characters[characterIndex]) {
          // 使用Alpine的响应式更新
          menuData.characters[characterIndex].inTank = true;
          // 强制触发更新
          if (window.Alpine) {
            window.Alpine.nextTick(() => {
              console.log(`✅ UI已更新：角色${characterIndex + 1}在战车上`);
            });
          }
        }
      }
      
      // 如果是当前控制的角色，更新玩家战车状态
      if (characterIndex === 0) {
        this.playerInTank = true;
        this.currentTank = tank;
      }
      
      console.log(`✅ 角色${characterIndex + 1}已上车，战车将跟随`);
    };
    
    // 下车 - 支持指定角色
    Phaser.Scene.prototype.dismountTank = function(characterIndex = 0) {
      const charSprite = this.characterSprites[characterIndex];
      if (!charSprite || !charSprite.inTank || !charSprite.currentTank) return;
      
      console.log(`🚶 角色${characterIndex + 1}下车！`);
      
      const tank = charSprite.currentTank;
      
      // 显示角色sprite
      charSprite.visible = true;
      
      // 角色下车到战车旁边
      charSprite.x = tank.x + 32;
      charSprite.y = tank.y;
      
      // 清除状态
      charSprite.inTank = false;
      tank.occupiedBy = null;
      charSprite.currentTank = null;
      
      // 更新UI数据并强制触发Alpine响应式更新
      const menuElement = document.querySelector('[x-data="gameMenu"]');
      if (menuElement && menuElement.__x) {
        const menuData = menuElement.__x.$data;
        if (menuData.characters[characterIndex]) {
          // 使用Alpine的响应式更新
          menuData.characters[characterIndex].inTank = false;
          // 强制触发更新
          if (window.Alpine) {
            window.Alpine.nextTick(() => {
              console.log(`✅ UI已更新：角色${characterIndex + 1}已下车`);
            });
          }
        }
      }
      
      // 如果是主角，清除全局战车状态
      if (characterIndex === 0) {
        this.playerInTank = false;
        this.currentTank = null;
      }
      
      console.log(`✅ 角色${characterIndex + 1}已下车`);
    }; */

    // ==================== 记录主角位置并更新队友 ====================
    Phaser.Scene.prototype.recordPlayerPosition = function () {
        if (!this.followerHistory) return;

        // 记录主角当前位置和帧
        this.followerHistory.push({
            x: this.player.x,
            y: this.player.y,
            frame: this.player.frame.name
        });

        // 限制历史记录长度
        if (this.followerHistory.length > this.maxHistoryLength) {
            this.followerHistory.shift();
        }

        // 更新队友位置（让队友平滑移动到历史位置）
        if (this.followers && this.followers.length > 0) {
            // 每个队友跟随不同距离
            const followDistance = 1; // 队友跟随1步之前的位置

            this.followers.forEach((follower, index) => {
                // follower1 走 1 步前的位置，follower2 走 2 步前的位置
                const stepsBack = (index + 1) * followDistance;
                const historyIndex = this.followerHistory.length - 1 - stepsBack;

                // 确保历史记录足够
                if (historyIndex >= 0 && historyIndex < this.followerHistory.length) {
                    const targetPos = this.followerHistory[historyIndex];

            // 🚗 [战车系统已禁用] 战车跟随逻辑
            /* // 如果队友在战车上，移动战车而不是队友
            if (follower && follower.inTank && follower.currentTank) {
              const tank = follower.currentTank;
              
              // 计算移动方向
              const deltaX = targetPos.x - tank.x;
              const deltaY = targetPos.y - tank.y;
              
              // 播放战车动画
              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                  tank.anims.play(`tank${tank.tankIndex + 1}-walk-right`, true);
                } else {
                  tank.anims.play(`tank${tank.tankIndex + 1}-walk-left`, true);
                }
              } else {
                if (deltaY > 0) {
                  tank.anims.play(`tank${tank.tankIndex + 1}-walk-down`, true);
                } else {
                  tank.anims.play(`tank${tank.tankIndex + 1}-walk-up`, true);
                }
              }
              
              // 平滑移动战车
              this.tweens.add({
                targets: tank,
                x: targetPos.x,
                y: targetPos.y,
                duration: 200,
                ease: 'Linear',
                onComplete: () => {
                  tank.anims.stop();
                }
              });
              
              // 同步移动队友位置（隐藏但位置同步）
              follower.x = targetPos.x;
              follower.y = targetPos.y;
              
            } else */ if (follower /* && !follower.inTank */) {
                        // 队友没在战车上，正常移动
                        const deltaX = targetPos.x - follower.x;
                        const deltaY = targetPos.y - follower.y;

                        if (Math.abs(deltaX) > Math.abs(deltaY)) {
                            if (deltaX > 0) {
                                follower.anims.play(`char${index + 2}-walk-right`, true);
                            } else {
                                follower.anims.play(`char${index + 2}-walk-left`, true);
                            }
                        } else {
                            if (deltaY > 0) {
                                follower.anims.play(`char${index + 2}-walk-down`, true);
                            } else {
                                follower.anims.play(`char${index + 2}-walk-up`, true);
                            }
                        }

                        // 平滑移动到目标位置
                        this.tweens.add({
                            targets: follower,
                            x: targetPos.x,
                            y: targetPos.y,
                            duration: 200,
                            ease: 'Linear',
                            onComplete: () => {
                                follower.anims.stop();
                                follower.setFrame(targetPos.frame);
                            }
                        });
                    }
                }
            });
        }
    };

    // ==================== 开始方格移动 ====================
    Phaser.Scene.prototype.startGridMove = function (direction) {
        this.isMoving = true;
        this.moveDirection = direction;

        // 🚗 [战车系统已禁用] 战车移动判断
        // 判断是移动玩家还是战车
        // const movingSprite = this.playerInTank ? this.currentTank : this.player;
        const movingSprite = this.player; // 只移动玩家

        // 计算目标位置（每次移动32px = 2个tile）
        let targetX = movingSprite.x;
        let targetY = movingSprite.y;

        // 🚗 [战车系统已禁用] 战车动画选择
        /* // 获取动画前缀
        let animPrefix = '';
        if (this.playerInTank && this.currentTank) {
          // 根据战车类型选择动画
          animPrefix = `tank${this.currentTank.tankIndex + 1}-`;
        } */

        switch (direction) {
            case 'up':
                targetY -= this.tileSize;
                movingSprite.anims.play('walk-up', true); // 🚗 移除 animPrefix
                break;
            case 'down':
                targetY += this.tileSize;
                movingSprite.anims.play('walk-down', true); // 🚗 移除 animPrefix
                break;
            case 'left':
                targetX -= this.tileSize;
                movingSprite.anims.play('walk-left', true); // 🚗 移除 animPrefix
                break;
            case 'right':
                targetX += this.tileSize;
                movingSprite.anims.play('walk-right', true); // 🚗 移除 animPrefix
                break;
        }

        // ✅ 检查世界边界
        const worldBounds = this.physics.world.bounds;
        // tileSize = 32px (玩家移动的格子大小)
        // 玩家精灵是32x32，但碰撞体是16x16，所以用碰撞体大小来检查
        const playerCollisionSize = 16; // 玩家碰撞体的实际大小
        const minBound = playerCollisionSize / 2; // 碰撞体中心最小值 = 8
        const maxBoundX = worldBounds.width - (playerCollisionSize / 2); // 地图宽度 - 8
        const maxBoundY = worldBounds.height - (playerCollisionSize / 2); // 地图高度 - 8

        if (targetX < minBound || targetX > maxBoundX ||
            targetY < minBound || targetY > maxBoundY) {
            this.isMoving = false;
            movingSprite.anims.stop();
            console.log(`❌ 边界检查失败: target(${targetX}, ${targetY}), bounds(${minBound} ~ ${maxBoundX}, ${minBound} ~ ${maxBoundY}), worldBounds(${worldBounds.width}, ${worldBounds.height})`);
            return;
        }

        // ✅ 优化的碰撞检测（只检测目标中心点的tile）
        if (this.collisionLayer) {
            // 目标位置的tile坐标（中心点）
            const centerTileX = Math.floor(targetX / 16);
            const centerTileY = Math.floor(targetY / 16);
            const tile = this.collisionLayer.getTileAt(centerTileX, centerTileY);
            if (tile && tile.collides) {
                // 检测到碰撞，取消移动
                this.isMoving = false;
                this.player.anims.stop();
                console.log('❌ 碰撞检测：tile', centerTileX, centerTileY, '有碰撞');
                return;
            }
        }

        // ✅ 检查NPC碰撞
        if (this.npcSystem) {
            for (let npc of this.npcSystem.npcs) {
                // 计算目标位置与NPC的距离
                const distance = Phaser.Math.Distance.Between(
                    targetX, targetY,
                    npc.sprite.x, npc.sprite.y
                );

                // 如果距离小于一个格子，说明会碰撞
                if (distance < this.tileSize) {
                    this.isMoving = false;
                    movingSprite.anims.stop();
                    console.log('❌ NPC碰撞：', npc.name);
                    return;
                }
            }
        }

        // ✅ 所有检查通过，执行移动
        console.log('✅ 移动到:', targetX, targetY);

      // 🚗 [战车系统已禁用] 战车移动动画
      /* // 如果在战车上，同时移动玩家和战车
      if (this.playerInTank && this.currentTank) {
        // 移动战车
        this.tweens.add({
          targets: this.currentTank,
          x: targetX,
          y: targetY,
          duration: 200,
          ease: 'Linear',
          onComplete: () => {
            this.isMoving = false;
            this.currentTank.anims.stop();
            
            // 记录主角位置历史（移动完成后）
            this.recordPlayerPosition();
            
            this.checkBattle();
          }
        });
        
        // 同步移动玩家（隐藏但位置同步）
        this.tweens.add({
          targets: this.player,
          x: targetX,
          y: targetY,
          duration: 200,
          ease: 'Linear'
        });
      } else */ {
            // 正常移动玩家
            this.tweens.add({
                targets: this.player,
                x: targetX,
                y: targetY,
                duration: 200,
                ease: 'Linear',
                onComplete: () => {
                    this.isMoving = false;
                    this.player.anims.stop();

                    // 记录主角位置历史（移动完成后）
                    this.recordPlayerPosition();

                    this.checkBattle();
                    
                    // 🗺️ 检查传送点
                    this.checkPortal();
                }
            });
        }
    };

    // 检查战斗
    Phaser.Scene.prototype.checkBattle = function () {
        // ==================== 战斗触发检测（已禁用） ====================
        /* 随机遇敌已禁用，使用NPC触发战斗测试
        this.battleSteps++;
        if (Math.random() < this.battleChancePerStep && this.battleSteps > 5) {
          // 触发战斗
          this.battleSteps = 0;
          const enemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
          this.triggerBattle(enemy);
        }
        */
    };

    // ==================== 触发战斗 ====================
    Phaser.Scene.prototype.triggerBattle = function (enemyData) {
        console.log('⚔️ Phaser 触发战斗！', enemyData);

        // 等待Alpine就绪
        if (!window.alpineReady) {
            console.warn('⏳ Alpine尚未就绪，延迟触发战斗');
            setTimeout(() => this.triggerBattle(enemyData), 100);
            return;
        }

        // 使用全局函数触发战斗
        if (window.startBattle) {
            console.log('✅ 调用全局 window.startBattle');
            window.startBattle(enemyData);
        } else {
            console.error('❌ window.startBattle 未定义');
        }
    };

    // 🗺️ 检查传送点
    Phaser.Scene.prototype.checkPortal = function () {
        // 计算玩家当前的tile坐标
        const playerTileX = Math.floor(this.player.x / 16);
        const playerTileY = Math.floor(this.player.y / 16);
        
        console.log(`🗺️ 检查传送点: 玩家位置 (${playerTileX}, ${playerTileY}), 地图: ${this.currentMapName}`);
        
        // 定义传送点配置
        const portals = {
            '拉多镇': [
                {
                    name: '修车店入口',
                    x: 20, // tile坐标（16px为单位）
                    y: 16,
                    width: 2,
                    height: 1,
                    targetMap: '拉多镇-修车店',
                    targetSpawn: 'from_town'
                }
            ],
            '拉多镇-修车店': [
                {
                    name: '修车店出口',
                    x: 7, // tile坐标
                    y: 12,
                    width: 3,
                    height: 1,
                    targetMap: '拉多镇',
                    targetSpawn: 'from_garage'
                }
            ]
        };
        
        // 获取当前地图的传送点
        const currentPortals = portals[this.currentMapName];
        if (!currentPortals) {
            console.log('🗺️ 当前地图没有传送点配置');
            return;
        }
        
        // 检查每个传送点
        for (const portal of currentPortals) {
            if (playerTileX >= portal.x && playerTileX < portal.x + portal.width &&
                playerTileY >= portal.y && playerTileY < portal.y + portal.height) {
                console.log(`🚪 触发传送点: ${portal.name}`);
                
                // 延迟一点再切换地图，让动画播放完成
                this.time.delayedCall(100, () => {
                    this.switchMap(portal.targetMap, portal.targetSpawn);
                });
                
                break;
            }
        }
    };

    window.addEventListener('load', () => {
        game = new Phaser.Game(config);
    });

    window.addEventListener('resize', () => {
        if (game) {
            game.scale.resize(
                Math.min(800, window.innerWidth),
                Math.min(600, window.innerHeight)
            );
        }
    });
})();
