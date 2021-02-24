/*
 * Copyright (C) 2020 Peter Sjödin, KTH
 *
 * This file is subject to the terms and conditions of the GNU Lesser
 * General Public License v2.1. See the file LICENSE in the top level
 * directory for more details.
 */

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "msg.h"
#include "net/ipv6/addr.h"
#include "xtimer.h"

#include "mqttsn_publisher.h"
#include "report.h"
#include "pms5003.h"
#define ENABLE_DEBUG    (0)
#include "debug.h"

#ifdef BOARD_AVR_RSS2
#include "pstr_print.h"
#endif

//static int seq_nr_value = 0;

#if defined(MODULE_GNRC_RPL)
int rpl_report(uint8_t *buf, size_t len, uint8_t *finished);
#endif

int mqttsn_report(uint8_t *buf, size_t len, uint8_t *finished);
int boot_report(uint8_t *buf, size_t len, uint8_t *finished);

static size_t preamble(uint8_t *buf, size_t len) {
     char *s = (char *) buf;
     size_t l = len;
     //size_t n;
     int nread = 0;
     
     RECORD_START(s + nread, l - nread);
     /*
     PUTFMT("{\"bn\":\"urn:dev:mac:");
     n = get_nodeid(RECORD_STR(), RECORD_LEN());
     RECORD_ADD(n);
     PUTFMT(";\"");
     PUTFMT(",\"bu\":\"count\",\"bt\":%lu}", (uint32_t) (xtimer_now_usec()/1000000));
     PUTFMT(",{\"n\":\"seq_no\",\"u\":\"count\",\"v\":%d}", 9000+seq_nr_value++);
     */
     PUTFMT("{\"DB0_3\":%-u,\"DB0_5\":%-u,\"DB1\":%-u,\"DB2_5\":%-u,\"DB5\":%-u,\"DB10\":%-u }",pms5003_db0_3(),pms5003_db0_5(),pms5003_db1(),pms5003_db2_5(),pms5003_db5(),pms5003_db10());
     RECORD_END(nread);
     return (nread);
}

/*
 * Report scheduler -- return report generator function to use next
 */

typedef enum {
#if defined(MODULE_GNRC_RPL)
  s_rpl_report,
#endif
  s_mqttsn_report,
  s_max_report
} report_state_t;

report_gen_t next_report_gen(void) {
     static unsigned int reportno = 0;

     if (reportno++ == 0)
       return(boot_report);

     switch (reportno % s_max_report) {
#if defined(MODULE_GNRC_RPL)
     case s_rpl_report:
          return(rpl_report);
#endif
     case s_mqttsn_report:
          return(mqttsn_report);
     default:
         printf("Bad report no %d\n", reportno);
     }
     return NULL;
}
/*
static char *reportfunstr(report_gen_t fun) {
  if (fun == NULL)
    return "NUL";
  else if (fun == boot_report)
    return "boot";
#if defined(MODULE_GNRC_RPL)
  else if (fun == rpl_report)
    return("rpl");
#endif
  else if (fun == mqttsn_report)
    return("mqttsn");
  else
    return("???");
}
*/
/*
 * Reports -- build report by writing records to buffer 
 */
/*
static size_t reports(uint8_t *buf, size_t len) {
     char *s = (char *) buf;
     size_t l = len;
     size_t nread = 0;
     static report_gen_t reportfun = NULL;
     static uint8_t finished;

     if (reportfun == NULL) {
          reportfun = next_report_gen();
     }
     do {
          int n = reportfun((uint8_t *) s + nread, l - nread, &finished);
          DEBUG("reportfun '%s', n %d (tot %d) finished %d\n", reportfunstr(reportfun), n, nread, (int) finished);
          if (n == 0)
               return (nread);
          else
               nread += n;
     } while (!finished);
     reportfun = NULL;
     return (nread);
}
*/

size_t makereport(uint8_t *buffer, size_t len) {
     char *s = (char *) buffer;
     size_t l = len;
     size_t n;
     int nread = 0;
     
     RECORD_START(s + nread, l - nread);
     PUTFMT("[");
     n = preamble((uint8_t *) RECORD_STR(), RECORD_LEN()-1); /* Save one for last bracket */
     RECORD_ADD(n);
     /*
     n = reports((uint8_t *) RECORD_STR(), RECORD_LEN()-1);  Save one for last bracket 
     RECORD_ADD(n);
     */
     PUTFMT("]");
     RECORD_END(nread);

     return (nread);
}

