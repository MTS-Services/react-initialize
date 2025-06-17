import React from "react";

const ReantCard = () => {
  return (
    <div className="bg-White-50-Raw inline-flex h-72 w-[792px] flex-col items-center justify-center gap-2.5 rounded-xl p-4 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)]">
      <div className="inline-flex w-[760px] items-center justify-start gap-6">
        <div className="flex h-64 w-96 items-start justify-end gap-2.5 rounded-lg p-4">
          <div
            data-property-1="Default"
            className="flex h-9 w-9 items-center justify-center gap-2.5 overflow-hidden rounded-[50px] border-t border-zinc-900/5 bg-white p-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]"
          >
            <div className="relative h-4 w-4 overflow-hidden">
              <div className="absolute top-[2.95px] left-[1.26px] h-3.5 w-4 bg-blue-700" />
            </div>
          </div>
        </div>
        <div className="inline-flex flex-1 flex-col items-start justify-center gap-6">
          <div className="flex flex-col items-start justify-start gap-5 self-stretch">
            <div className="flex flex-col items-start justify-start gap-3 self-stretch">
              <div className="inline-flex items-center justify-between self-stretch">
                <div className="justify-start font-['Lato'] text-xl font-semibold text-black capitalize">
                  Hofvijver
                </div>
                <div className="flex items-center justify-start gap-1.5">
                  <div className="relative h-4 w-4 overflow-hidden">
                    <div className="absolute top-[1.62px] left-[1.62px] h-3 w-3 bg-blue-700" />
                  </div>
                  <div className="justify-start font-['Inter'] text-xs font-normal text-blue-700">
                    6 uur geleden gevonden
                  </div>
                </div>
              </div>
              <div className="text-White-700 justify-start self-stretch font-['Inter'] text-sm font-normal">
                We hebben een nieuwe woning gevonden in S-Hertogenbosch. Het is
                een 2 kamerappartement met een oppervlakte van 107m². Reageer
                snel voordat de woning weg is!"
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-4 self-stretch">
              <div className="inline-flex items-start justify-between self-stretch">
                <div className="flex items-center justify-start gap-4">
                  <div className="bg-White-100 inline-flex w-20 flex-col items-center justify-center gap-2.5 rounded-[39px] px-2 py-1.5">
                    <div className="inline-flex items-end justify-start gap-1.5 self-stretch">
                      <div className="flex items-center justify-start gap-1.5">
                        <div className="relative h-4 w-4 overflow-hidden">
                          <div className="bg-White-900 absolute top-[2.67px] left-[2.67px] h-2.5 w-2.5" />
                        </div>
                      </div>
                      <div className="justify-start">
                        <span class="text-White-900 font-['Inter'] text-xs font-normal">
                          107m
                        </span>
                        <sup class="text-White-900 font-['Inter'] text-xs font-normal">
                          2
                        </sup>
                      </div>
                    </div>
                  </div>
                  <div className="bg-White-100 inline-flex w-20 flex-col items-center justify-center gap-2.5 rounded-[39px] px-2 py-1.5">
                    <div className="inline-flex items-center justify-start gap-1.5">
                      <div
                        data-weight="Dynamic"
                        className="relative h-4 w-4 overflow-hidden"
                      >
                        <div className="absolute top-[14px] left-[7.33px] h-0 w-[1.33px] origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                        <div className="absolute top-[10.67px] left-[7.33px] h-0 w-[2.67px] origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                        <div className="absolute top-[10.90px] left-[9.33px] h-[1.33px] w-[2.90px] origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                        <div className="absolute top-[8px] left-[5.33px] h-0 w-2 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                        <div className="absolute top-[8px] left-[2px] h-0 w-[1.33px] outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                        <div className="absolute top-[2px] left-[2px] h-3 w-0 origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                        <div className="absolute top-[14px] left-[14px] h-2 w-3 origin-top-left rotate-180 rounded-[0.60px] outline outline-[1.50px] outline-offset-[-0.75px] outline-black" />
                      </div>
                      <div className="text-White-900 justify-start font-['Inter'] text-xs font-normal">
                        2
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-between self-stretch">
                <div className="bg-White-100 inline-flex flex-col items-center justify-center gap-2.5 rounded-[39px] px-2 py-1.5">
                  <div className="inline-flex items-center justify-start gap-1.5">
                    <div className="relative h-4 w-4 overflow-hidden">
                      <div className="outline-White-900 absolute top-[1.50px] left-[3.50px] h-3 w-2 outline outline-1 outline-offset-[-0.50px]" />
                      <div className="outline-White-900 absolute top-[4.50px] left-[6.50px] h-[3px] w-[3px] outline outline-1 outline-offset-[-0.50px]" />
                    </div>
                    <div className="text-White-900 justify-start font-['Inter'] text-xs font-normal">
                      S-Hertogenbosch - Nederland
                    </div>
                  </div>
                </div>
                <div className="justify-start text-right font-['Lato'] text-xl font-semibold text-blue-700 capitalize">
                  € 1735
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex max-h-12 items-center justify-center gap-2.5 self-stretch overflow-hidden rounded bg-gradient-to-l from-yellow-600 to-yellow-500 px-6 py-5">
            <div className="justify-center text-center font-['Poppins'] text-base font-medium text-white">
              Bekijk de woning
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReantCard;
