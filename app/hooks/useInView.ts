import { RefObject, useEffect, useState } from "react";

interface Options {
  /**
   * 测试交叉时，用作边界盒的元素或文档。
   * 如果构造函数未传入 root 或其值为null，则默认使用顶级文档的视口。
   */
  root?: RefObject<Element>;
  /**
   * 计算交叉时添加到根边界盒 (en-US)的矩形偏移量，可以有效的缩小或扩大根的判定范围从而满足计算需要。
   * 此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。
   * 所有的偏移量均可用像素（px）或百分比（%）来表达，默认值为 “0px 0px 0px 0px”。
   * 如果想提前100px触发可以设置bottom为100px,延后则为-100px
   */
  rootMargin?: string;
  /**
   * 一个包含阈值的列表，按升序排列，列表中的每个阈值都是监听对象的交叉区域与边界区域的比率。
   * 当监听对象的任何阈值被越过时，都会生成一个通知。
   * 如果构造器未传入值，则默认值为 0。
   * 如果你想要 target 元素在 root 元素的可见程度每多 25%就执行一次回调，那么你可以指定一个数组[0, 0.25, 0.5, 0.75, 1]。
   */
  threshold?: number[];
  // 只出现一次
  once?: boolean;
}

export const useInView = (ref, options?: Options) => {
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || (options?.once && isInView)) return;

    // const onEnter = () => {
    //   setInView(true);
    //   return options?.once ? undefined : () => setInView(false);
    // };

    const _options = {
      root: (options?.root && options.root.current) || undefined,
      ...options,
    };

    return setup(ref.current, setInView, _options);
  }, [options?.root, ref, options?.rootMargin, options?.once]);

  return isInView;
};

const setup = (element, setInView, options) => {
  // 创建一个WeakMap用作缓存
  // const activeIntersections = new WeakMap();
  const callback = (entries) => {
    entries.forEach((entry) => {
      // const onEnd = activeIntersections.get(entry.target);
      // // 元素相交,onEnd为函数(即上一次的onEnd未调用),return
      // // 元素不相交, onEnd为undefined, return
      // if (entry.isIntersecting === Boolean(onEnd)) return;
      // if (entry.isIntersecting) {
      //   // 相交时， 调用onEnter函数， 设置inView为True， 同时得到一个函数
      //   const newOnEnd = onEnter(entry);
      //   if (typeof newOnEnd === "function") {
      //     // 如果once为false 的话 onEnter会返回一个函数， 用于设置inView为false
      //     activeIntersections.set(entry.target, newOnEnd);
      //   } else {
      //     // once为true， 取消监听
      //     observer.unobserve(entry.target);
      //   }
      // } else if (onEnd) {
      //   // 如果变为不相交了，并且之前有一个onEnd函数， 则会调用onEnd函数
      //   onEnd(entry);
      //   // 清掉调用完的onEnd函数
      //   activeIntersections.delete(entry.target);
      // }
      if (entry.isIntersecting) {
        setInView(true);
        if (options.once) {
          observer.unobserve(entry.target);
        }
      } else {
        setInView(false);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(element);
  return () => observer.disconnect();
};
